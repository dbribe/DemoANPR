DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '++$bplm!@f0p(ri&n!tf8xase_5nsjawxj8zt3ku(hn0j+bxx3'

ALLOWED_HOSTS = ['']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
        'CONN_MAX_AGE': 600,
    },
}