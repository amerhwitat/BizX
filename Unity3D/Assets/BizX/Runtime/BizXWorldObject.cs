using UnityEngine;

namespace BizX
{
    [System.Serializable]
    public class BizXWorldObject
    {
        public string Id;
        public Vector3 Position;
        public Vector3 EulerRotation;
        public Vector3 Scale = Vector3.one;
        [TextArea] public string MetadataJson;
    }
}
