So here we have a basic post, Every interaction will at least have a text msg so I'm using that as the element generating the values or velocity of my controllers.

![Interaction Components](../project_images/Interaction_Components.png?raw=true "Interaction Components")

There is more than one way to create this values,one can be

## Based on length

If a tweet comes in: **(the number of characters)** *X* **(0.914285714285714)** which gives a max of 128 (MIDI goes from 0-127) because tweets can only be 140 chars long.
(140*0.914285714285714)=128

## Based on Activity

How many tweets someone has can be used to see how much noise this person makes,and by noise I mean how much he likes to be heard.

## Modifiers

This are the ones changing the way sound is being generated :

- *Chords* (Creates chords from Words)
- *Notes*  (Creates Notes from Letters)
- *Sound*  (Changes the sound source or style of sound)
- *Effects* (Delay, Revereb, Flanger,Phaser,Loops...etc)

## Extra Content

This can be an embeded video, a picture, or a link to a new sound.
And this will be used in reactive visuals controlled by the same post.