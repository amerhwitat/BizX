package emailsender

import "fmt"

type RelayPolicy struct { Authorized, OpenRelay, SpoofFrom, PrivacyMode bool }

func (p RelayPolicy) Validate() error {
    if p.OpenRelay || p.SpoofFrom { return fmt.Errorf("open relays and From spoofing are disabled") }
    if !p.Authorized { return fmt.Errorf("relay authorization is required") }
    return nil
}
