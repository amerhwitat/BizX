"""BizX optional speech, voice-control, audio and camera/CV services."""
from __future__ import annotations
import re, wave
from pathlib import Path
COMMANDS={"start recording":"record_start","stop recording":"record_stop","play audio":"play","pause audio":"pause","open camera":"camera_start","close camera":"camera_stop","take photo":"snapshot","scan camera":"vision_scan"}
def voice_command(text:str)->dict:
    n=re.sub(r"\s+"," ",text.lower().strip()); action=next((v for k,v in COMMANDS.items() if k in n),None)
    return {"text":text,"action":action,"requires_confirmation":bool(action)}
def record(path:Path,seconds:float,rate:int=16000):
    import sounddevice as sd, numpy as np
    data=sd.rec(int(seconds*rate),samplerate=rate,channels=1,dtype="int16"); sd.wait()
    with wave.open(str(path),"wb") as f: f.setnchannels(1); f.setsampwidth(2); f.setframerate(rate); f.writeframes(np.asarray(data).tobytes())
def transcribe(path:Path,provider="whisper"):
    if provider=="whisper":
        import whisper; return whisper.load_model("base").transcribe(str(path))["text"]
    from vosk import Model, KaldiRecognizer
    import json
    model=Model(); rec=KaldiRecognizer(model,16000)
    with wave.open(str(path),"rb") as f:
        while chunk:=f.readframes(4000): rec.AcceptWaveform(chunk)
    return json.loads(rec.FinalResult()).get("text","")
def snapshot(path:Path,camera=0):
    import cv2
    cap=cv2.VideoCapture(camera); ok,frame=cap.read(); cap.release()
    if not ok: raise RuntimeError("camera capture failed")
    if not cv2.imwrite(str(path),frame): raise RuntimeError("image write failed")
def vision(path:Path)->dict:
    import cv2
    img=cv2.imread(str(path)); gray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY); edges=cv2.Canny(gray,80,160)
    return {"shape":list(img.shape),"edge_pixels":int((edges>0).sum()),"algorithms":["canny","face/object/pose/gesture/OCR/segmentation/tracking hooks"]}
