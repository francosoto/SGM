members="SIGMA-IT nguidi francosoto mrios jprongue gpittau"
 
for member in $members
do
	#Borra remote de cada uno
	git remote rm $member
	#Crea un remote para cada uno
	git remote add $member git@github.com:$member/SGM.git
	#git branch -d $member
	#Crea un branch para cada uno
	git fetch $member
	#Crea un branch para cada uno
	for branch in $(git branch -rl | grep $member)
	do
		git log my-$branch > /dev/null
		exit_status=$?
		if [ "${exit_status}" -eq "0" ]
		then
			echo "branch my-$branch ya existe"
		else
			echo "creando branch my-$branch trackeando: $branch"
			git branch --track my-$branch $branch
		fi
	done
done