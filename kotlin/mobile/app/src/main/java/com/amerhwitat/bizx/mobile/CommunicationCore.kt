package com.amerhwitat.bizx.mobile

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioRecord
import android.media.AudioTrack
import android.media.MediaRecorder
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager
import androidx.core.content.ContextCompat
import java.security.MessageDigest
import java.util.concurrent.ConcurrentHashMap

data class ChatEvent(val conversationId:String,val senderId:String,val sequence:Long,val text:String,val sha256:String)

object ConversationSync {
    private val seen = ConcurrentHashMap<String,Long>()
    fun accept(e:ChatEvent):Boolean {
        val key="${e.conversationId}:${e.senderId}"
        val actual=MessageDigest.getInstance("SHA-256").digest(e.text.toByteArray()).joinToString(""){ "%02x".format(it) }
        if(actual!=e.sha256) return false
        val old=seen[key] ?: -1L
        if(e.sequence<=old) return false
        seen[key]=e.sequence
        return true
    }
}

data class MediaCapabilities(val microphone:Boolean,val speaker:Boolean,val camera:Boolean) {
    companion object { fun detect(context:Context):MediaCapabilities {
        val mic=ContextCompat.checkSelfPermission(context,Manifest.permission.RECORD_AUDIO)==PackageManager.PERMISSION_GRANTED
        val cam=ContextCompat.checkSelfPermission(context,Manifest.permission.CAMERA)==PackageManager.PERMISSION_GRANTED
        val cm=context.getSystemService(Context.CAMERA_SERVICE) as CameraManager
        val hasCamera=try { cm.cameraIdList.isNotEmpty() } catch(_:Exception){false}
        return MediaCapabilities(mic,context.getSystemService(Context.AUDIO_SERVICE)!=null,cam && hasCamera)
    }}
}

class PcmVoiceEngine {
    private var recorder:AudioRecord?=null
    private var player:AudioTrack?=null
    fun start(sampleRate:Int=48000) {
        val min=AudioRecord.getMinBufferSize(sampleRate,AudioFormat.CHANNEL_IN_MONO,AudioFormat.ENCODING_PCM_16BIT)
        recorder=AudioRecord(MediaRecorder.AudioSource.VOICE_COMMUNICATION,sampleRate,AudioFormat.CHANNEL_IN_MONO,AudioFormat.ENCODING_PCM_16BIT,min)
        player=AudioTrack.Builder().setAudioAttributes(AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_VOICE_COMMUNICATION).setContentType(AudioAttributes.CONTENT_TYPE_SPEECH).build()).setAudioFormat(AudioFormat.Builder().setSampleRate(sampleRate).setEncoding(AudioFormat.ENCODING_PCM_16BIT).setChannelMask(AudioFormat.CHANNEL_OUT_MONO).build()).setBufferSizeInBytes(min).build()
        recorder?.startRecording(); player?.play()
    }
    fun stop(){ recorder?.stop(); recorder?.release(); recorder=null; player?.stop(); player?.release(); player=null }
}

interface RealtimeMediaTransport { fun sendAudio(frame:ByteArray); fun sendVideo(frame:ByteArray); fun close() }
