# BizX Speech, Voice, Audio and Camera AI

The media layer is provider-neutral and keeps microphone/camera access disabled until explicitly enabled by the user.

## Speech
- Whisper adapter: multilingual ASR, translation and language identification.
- Vosk adapter: offline/streaming ASR where a deployment supplies a compatible model.

## Audio
- WAV recording with optional PortAudio/sounddevice backend.
- Playback is exposed through the application media backend; GStreamer is the preferred native multimedia integration on Linux.

## Voice control
Voice text is normalized into an explicit command envelope. Commands that change application state require confirmation.

## Computer vision
Camera frames can feed OpenCV pipelines and optional MediaPipe tasks for face detection/landmarks, object detection, pose, gestures, segmentation and tracking. OCR and barcode/QR analysis are extension points.

No proprietary upstream source is copied into BizX. Provider adapters are based on documented public APIs and license-compatible integration boundaries.
