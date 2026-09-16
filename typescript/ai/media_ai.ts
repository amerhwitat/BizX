export type MediaCapability='speech_recognition'|'voice_control'|'recording'|'playback'|'camera_capture'|'computer_vision';
export type VisionAlgorithm='face'|'object'|'pose'|'gesture'|'ocr'|'segmentation'|'tracking'|'edges';
const commands:Record<string,string>={'start recording':'record_start','stop recording':'record_stop','play audio':'play','pause audio':'pause','open camera':'camera_start','close camera':'camera_stop','take photo':'snapshot','scan camera':'vision_scan'};
export function parseVoiceCommand(text:string){const n=text.trim().toLowerCase().replace(/\s+/g,' '); const key=Object.keys(commands).find(k=>n.includes(k)); return {text,action:key?commands[key]:undefined,requiresConfirmation:!!key};}
export interface VisionResult {width:number;height:number;channels:number;algorithms:VisionAlgorithm[];}
export interface MediaPolicy {microphoneDefault:'off';cameraDefault:'off';networkUploadDefault:false;commandConfirmation:true;}
