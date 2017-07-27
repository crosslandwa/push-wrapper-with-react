- realtime sequence recording/parameter lock type behaviour. What I think....?
  - how to delete a parameter lock for a step?
  - decay per step
  - edit multiple steps at same time?

- more samples
  - some task to pull in non-version controlled audio assets from disk as part of build
- pan per voice/step
- duplicate kit (hold duplicate, press kit select button, copies current kit to that kit)
- duplicate pattern (hold duplicate, press pattern select button, copies current pattern to that pattern)
- multiple/switchable patterns (work on current one in a 'scratch pad')
- save state to/from JSON
- swing
  - change it to switchable to 16n/8n
  - save as part of pattern?
- stutter
- change all voices at once?
  - sample player decay envelope
  - pattern length


### Look at arrow functions/plugin to remove

```
class Button extends React.Component {
  // Use an arrow function here:
  handleClick = () => {
    console.log('clickity');
  }

  render() {
    return (
      <button onClick={this.handleClick}/>
    );
  }
}
```

Can use arrow functions so don't need to bind in the constructor
need the babel `babel-plugin-transform-class-properties` plugin

then in webapck:
```
{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              'flow'
            ],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties'
            ]
          }
        }
      }
```
