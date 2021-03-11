# calebcurryrepo
repo for caleb curry with a crypto coin demo app

# testCalebCurry

Blazedpath Deploy checklist order:
----------------------------------
////////////////////////
FIRST DEPLOY
////////////////////////
Open up a browser. go to cloud.blazedpath.com:

Steps:
1) Go to repositories.
	Create new.
	Add the https url for the git: (Eg. https://github.com/jlmerchanblazedpath/testCalebCurry.git))

2) Got to Pipelines -> Build & Deploy -> Create New
	Build&Deploy (GitHub)
	Add Step: build / branchname: type main
	Add Step: Deploy / Development

3) Go to Environment: Create database(ses) if it was needed.

4) Go to Start Executions:
	select repository -> your repo
	select pipeline -> the one for github (has the main name instead of master)
	click on ok: it will start building. hit refresh after a while to see if its done.
	(after build is done) Click Configure deploy:
											select subdomain (if: mysubdomain.blazedpath.com, then subdomain: mysubdomain)
											add all the "must be defined" conditions. (Rest base url / config parameters / databases / etc)

	Resume execution.
	(after success)

5) Open on the ID in executions. you can see all the browsable sites.


////////////////////////
NEW DEPLOYS WITH NEW BUILDS
////////////////////////
