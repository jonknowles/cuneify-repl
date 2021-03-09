import pickle
import json

# I don't know python very well, sorry if this sucks!

file = open('./cuneiform_cache.pickle', 'rb')

pickleDict = pickle.load(file)

decoded = {}

def decode_dict(dictionary):
  for k, v in dictionary.items():
        decoded[k] = v.decode('utf-8')

decode_dict(pickleDict)

outputFile = open('cuneiformMap.json', 'w')
jsonStr = json.dump(decoded, outputFile)

outputFile.close()