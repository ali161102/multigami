import pandas as pd
import numpy as np

datestr = input("input date string (YYMMDD): ")

print("-- Importing results --")
Results = pd.read_csv(f'./WCA_export_results_{datestr}.tsv', sep='\t')

print("-- Importing attempts --")
Attempts = pd.read_csv(f'./WCA_export_attempts_{datestr}.tsv', sep='\t')

print("-- Producing .json file -- ")
mbldResults = Results[Results.event_id == "333mbf"]
vs = mbldResults.loc[mbldResults['best'] > -1, ['id']] 
ids = vs['id'].tolist()

mbldAttempts = Attempts.loc[Attempts['result_id'].isin(ids), ['value']]
results = mbldAttempts[mbldAttempts.value > 0]['value'].tolist()

def sa(value): # get solved and attempted cubes from db value
    string = str(value)
    missed = int(string[-2:])
    difference = 99 - int(string[0:2])
    solved = difference + missed
    attempted = solved + missed
    return((solved, attempted))

tally = {}
achieved = {n: [] for n in range(2, 71)}

for r in results:
    solved, attempted = sa(r)[0], sa(r)[1]
    score = solved*100 + attempted

    if score in tally:
        tally[score] += 1
    else:
        tally[score] = 1
        
        achieved[attempted].append(solved)

for k in [k for k in achieved.keys() if k <= 70]:
    na = []
    l = k//2 + k%2
    for i in range(l, k+1):
        if i not in achieved[k]:
            na.append(i)
    if len(na)>0:
        pass
        for solv in na:
            pass

with open(f'counts_{datestr}.js', 'w') as out_file:
    out_file.writelines('const counts = ')
    out_file.writelines(str(tally))
    out_file.writelines(';')

print("-- Export complete --")