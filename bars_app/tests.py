from django.test import SimpleTestCase
from django.urls import reverse, resolve
from bars_app.views import HomeView
from django.apps import apps


current_app = apps.get_containing_app_config(__name__).name


class TestUrls(SimpleTestCase):

    def test_home_url(self):
        url = reverse(current_app + ':home')
        self.assertEquals(resolve(url).func.view_class, HomeView)
