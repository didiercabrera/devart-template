'''
Morph-on Project

Overview
========

Morph-on is a project that transforms any kind of interaction on social networks,
into MIDI values and Controllers,
that can later be used to trigger or manipulate any kind of audiovisual interaction
'''

import sys
import simplejson as json
import tweepy
import interaction
import midi_methods
import datahandle
import time

#---Global configurations
global_settings=json.load(open("../settings/configs.json","r"))
user_settings=json.load(open("../settings/user_settings.json","r")) # Personal Twitter api keys and other info
user_settings=user_settings["twitter"]
#----------- 

tracker=global_settings["tracker"]

# Create or open a MIDI Port
midi_methods.open_MIDI_port(global_settings["default_MIDIport"])

# ----twitter streaming settings
consumer_key=user_settings["consumer_key"] 
consumer_secret=user_settings["consumer_secret"]
access_key =user_settings["access_key"]
access_secret =user_settings["access_secret"]
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_key, access_secret)
api = tweepy.API(auth)


class CustomStreamListener(tweepy.StreamListener):
    def on_status(self,status):
        # open("../settings/test4.json","a").write(status)
        data=status

        attrs={
            "interaction_type":"twitter",
            "data":{
                "text":data.text,
                "entities":data.entities
            },
            "user":{
                "name":data.user.name,
                "id":data.user.id,
                "followers_count":data.user.followers_count,
                "statuses_count":data.user.statuses_count,
                "profile_image_url":data.user.profile_image_url
            },
            "date":data.created_at,
            "source":data.source,
            "geo":data.geo,
            "coordinates":data.coordinates,
            "place":data.place
        }

        newTweet=interaction.Interaction(attrs)
        newTweet.send_MIDI_Interaction()
        try:
            # Save all attributes to MongoDB
            datahandle.save_interaction(newTweet.get_attributes())
        except Exception, e:
            print "error saving data : ", e
 
    def on_error(self, status_code):
        print >> sys.stderr, 'Encountered error with status code:', status_code
        return True # Don't kill the stream

    def on_timeout(self):
        print >> sys.stderr, 'Timeout...'
        return True # Don't kill the stream
sapi = tweepy.streaming.Stream(auth, CustomStreamListener())
print "Now Tracking:",tracker
sapi.filter(track=tracker)