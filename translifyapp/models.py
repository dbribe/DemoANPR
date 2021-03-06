from django.contrib.auth.base_user import BaseUserManager
from django.contrib.postgres.fields import CICharField
from django.core import validators
from django.utils import timezone
from establishment.funnel.stream import StreamObjectMixin
from establishment.accounts.models import AbstractStreamObjectUser
from django.db import models
from establishment.funnel.stream import StreamObjectMixin


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, username, is_staff, is_superuser, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        now = timezone.now()
        if not email:
            raise ValueError("Users must have an email address")
        # if not password:
            # raise ValueError("A password must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                          is_staff=is_staff, is_active=True,
                          is_superuser=is_superuser,
                          date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, username=None, **extra_fields):
        return self._create_user(email, password, username, False, False, **extra_fields)

    def create_superuser(self, email, password, username=None, **extra_fields):
        return self._create_user(email, password, username, True, True, **extra_fields)


class User(AbstractStreamObjectUser):
    objects = UserManager()

    username = CICharField(
        max_length=30,
        unique=True,
        null=True,
        blank=True,
        help_text="Required. 30 characters or fewer. Letters, digits and ./_ only.",
        validators=[
            validators.RegexValidator(
                regex=r"^((?![_.]{2,}).)*$",
                message="Enter a valid username. "
                        "This value may contain at most one consecutive separator( . or _ characters).",
                code="invalid"),
            validators.RegexValidator(
                regex=r"^[\w.]+$",
                message="Enter a valid username. This value may contain only letters,"
                        "numbers and separators ( . or _ characters).",
                code="invalid"),
            validators.RegexValidator(
                regex=r"^[^._]",
                message="Enter a valid username. This value may not start with a separator ( . or _ characters).",
                code="invalid"),
            validators.RegexValidator(
                regex=r"[^._]$",
                message="Enter a valid username. This value may not end with a separator ( . or _ characters).",
                code="invalid"),
        ],
        error_messages={
            "unique": "A user with that username already exists.",
        })


class TextTranslation(StreamObjectMixin):
    translation = models.CharField(max_length=1024*64)
    ext = models.CharField(max_length=16)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=256, default="Test")
    user = models.ForeignKey(User, default=1)

    class Meta:
        db_table = "TextTranslation"

    @classmethod
    def object_type(cls):
        return "texttranslation"

    def __str__(self):
        return "TextTranslation-" + str(self.id)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "photoUrl": "http://localhost:8000/translation_image/" + str(self.id) + self.ext,
            "content": self.translation,
            "translation": self.translation,
            "ext": self.ext,
            "dateCreated": self.date_created,
            "dateModified": self.date_modified
        }
