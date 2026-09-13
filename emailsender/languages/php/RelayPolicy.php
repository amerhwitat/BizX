<?php
namespace BizX\EmailSender;

final class RelayPolicy {
    public function __construct(public bool $authorized=true, public bool $openRelay=false, public bool $spoofFrom=false, public bool $privacyMode=false) {}
    public function validate(): void {
        if ($this->openRelay || $this->spoofFrom) throw new \RuntimeException('Open relays and From spoofing are disabled');
        if (!$this->authorized) throw new \RuntimeException('Relay authorization is required');
    }
}
