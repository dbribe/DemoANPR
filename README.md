# DemoANPR

You can find the live demo at [anpr.dbribe.com](http://anpr.dbribe.com)

## Installation

**Warning**
The installation of this app may require up to 2-3GB of hard disk space because of the libraries.

First, download the repository and its submodule **ANPR** :

```git clone https://github.com/dbribe/DemoANPR/ && cd DemoANPR && git clone https://github.com/dbribe/ANPR/```

For the project to work, you will need **Python3** and some submodules.

First, run **install.sh** to install **pip3** and other required libraries (you will need root access):

```bash ./install.sh```

Then, install the **Python3** requirements:

```pip3 install -r requirements.txt```

If some of the requirements aren't installed, don't worry. Just install each of them manually and you are good to go.

Next, you should start a Postgres database server and configure it. By default, Establishment needs a database server.
After you create a database, just add it in the **settings.py** directory.

Also, you should install and run **redis**.

## Run

To run the app:

```python3 manage.py runserver```

## Test

To test the app, just run it and add photos. All the uploads are saved in the **uploads** folder. For more info, and a simpler way to test the ANPR engine without installing the app, check out the ANPR submodule.
