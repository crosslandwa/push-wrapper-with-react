PITCH CONTROL
- display selected track pitch in UI/push LCD
- realtime sequence recording/parameter lock type behaviour. What I think....?

- bug where i delete selected step
 - press and hold a step (selects it)
 - press delete (enter delete mode)
 - press the same step again = BOOM (is this only a Dom/UI issue, as i can't press a push button twice without releasing it first...)
 - can replicate on push (hold step, press and hold delete, release and re-press step)
 - clear selected step when entering delete mode?

- select voice from row of buttons above grid (rather than shift press/on voice playback)

- knob to change selected track sample (more samples!)
- edit the velocity for a given step
- realtime step record to nearest (rather than next) step
- investigate re-rendering (react PureComponent should help here!)
- multiple/switchable patterns (work on current one in a 'scratch pad')
- save state to/from JSON
- autosave/restore from webstorage API
- sample player decay envelope
- stutter

- investigate https://github.com/reactjs/reselect
