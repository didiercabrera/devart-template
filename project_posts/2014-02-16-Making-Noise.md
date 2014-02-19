This is a project I've been developing for some time now,Constantly redoing everything cause I'm a little perfectionist,but until now I had no chance to really focus on what I wanted, Just making noise! Adding some features, getting rid of others, and now I'm back to basics where all started, a Crowdsorced Sound Experiment.

## Sending Notes and Creating a Controller

I'm using *#morphon* tag in all my tweets to test the interface
![Tweet](../project_images/tweet.png?raw=true "Tweet")

Each tweet is decomposed and analized, if matching keywords (play,stop,record,pause..etc) are found, they generate a new Midi Control,and each character is transformed into a note in a chromatic scale.

The controllers generated are used in a djing software to emulate someone playing, but can be used in so many ways,by having a MIDI Controller I can use it with any software capable of handling MIDI.

Volume is determined by the length of the tweet and Pitch by gender of the user.
Next thing to do is tempo and Loops.
Random Sound generation will be handled via PureData.
