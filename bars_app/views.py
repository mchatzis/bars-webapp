from django.views.generic import TemplateView, CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from bars_app.models import BarType
from bars.settings import HOST_NAME, HOST_IP, HOST_PORT, AWS_S3_READONLY_KEY_ID, AWS_S3_READONLY_SECRET_ACCESS_KEY, S3_BUCKET_NAME, MAPBOX_TOKEN


class HomeView(TemplateView):
    template_name = "bars_app/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        bar_types = BarType.objects.values_list('type', flat=True)
        context["bar_types"] = list(bar_types)
        context["settings"] = {
            "HOST_NAME": HOST_NAME,
            "HOST_IP": HOST_IP, 
            "HOST_PORT": HOST_PORT,
            "AWS_S3_READONLY_KEY_ID": AWS_S3_READONLY_KEY_ID,
            "AWS_S3_READONLY_SECRET_ACCESS_KEY": AWS_S3_READONLY_SECRET_ACCESS_KEY,
            "S3_BUCKET_NAME": S3_BUCKET_NAME,
            "MAPBOX_TOKEN": MAPBOX_TOKEN
            }
        return context

class RegisterView(CreateView):
    template_name = "registration/register.html"
    form_class = UserCreationForm
    success_url = reverse_lazy('login')

    def get_success_url(self):
        next_page = self.request.GET.get('next', None)
        if next_page is not None:
            return reverse_lazy('login') + "?next=" + next_page
        super().get_success_url()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['next'] = self.request.GET.get('next', None)
        return context