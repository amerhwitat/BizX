"""Run BizX with: python -m bizx [tycoon]"""

import sys
from .game_launcher import main

raise SystemExit(main(sys.argv[1] if len(sys.argv) > 1 else "default"))
