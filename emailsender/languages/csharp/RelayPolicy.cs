namespace BizX.EmailSender;

public sealed record RelayPolicy(bool Authorized = true, bool OpenRelay = false, bool SpoofFrom = false, bool PrivacyMode = false)
{
    public void Validate()
    {
        if (OpenRelay || SpoofFrom) throw new InvalidOperationException("Open relays and From spoofing are disabled");
        if (!Authorized) throw new InvalidOperationException("Relay authorization is required");
    }
}
