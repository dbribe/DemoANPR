from establishment.errors.models import get_error
from establishment.errors.errors import ErrorList


class MyErrorList(ErrorList):
    INVALID_MESSAGE_CONTENT = get_error(message="Invalid message content")
    MESSAGE_NOT_EDITABLE = get_error(message="Message not editable")
    MESSAGE_LIMIT_EXCEEDED = get_error(message="Message limit exceeded")
    NEW_PRIVATE_CHAT_LIMIT_EXCEEDED = get_error(message="Too many private chats initiated")


class StorageError(ErrorList):
    NO_FILES = get_error(message="No files to upload")
    TOO_MANY_FILES = get_error(message="Too many files to upload at the same time")
    WILL_EXCEED_FILES_LIMIT = get_error(message="Completion of this request will exceed the maximum "
                                                "number of total files you can store")
    WILL_EXCEED_SIZE_LIMIT = get_error(message="Completion of this request will exceed the maximum "
                                               "total size you can store")
    FILE_TOO_LARGE = get_error(message="One of the files you are uploading exceeds the maximum size limit")

    TOO_MANY_GALLERIES = get_error(message="You already have the maximum number of galleries.")
    INVALID_GALLERY = get_error(message="Invalid gallery id")
    FULL_GALLERY = get_error(message="Gallery is full")

    INVALID_SERVER = get_error(message="Internal server error! It appears storage server"
                                       " associated with this file does not exists!")
