- more samples
  - some task to pull in non-version controlled audio assets from disk as part of build
- pan per voice/step
- make patterns be sparse, i.e. appear on grid where placed, not on first N pads
- multiple/switchable patterns (work on current one in a 'scratch pad')
- save state to/from JSON file
- swing
  - change it to switchable to 16n/8n
  - save as part of pattern?
  - prevent skipped sequences getting out of swing sync
- stutter
- filter F per step

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
