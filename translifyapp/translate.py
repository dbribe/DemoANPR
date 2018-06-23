from PIL import Image
import pytesseract
from googletrans import Translator

translator = Translator()


def getLines(image):
	"""Get the text lines as seen in the image."""
	return pytesseract.image_to_string(Image.open(image), lang='eng').split("\n")


def translateText(text):
	"""Translate the text from English to Romanian"""
	return translator.translate(text, src='en', dest='ro')


def getTranslatedLines(image):
	"""Translate the text in the image line by line, joining the lines together (in a single line)."""
	result = []
	for line in translateText(getLines(image)):
		result.append(line.text)
	return ' '.join(result)

