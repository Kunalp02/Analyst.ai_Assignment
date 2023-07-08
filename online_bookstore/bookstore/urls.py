from django.urls import path
from . import views

urlpatterns = [
    path('authors/', views.author_list, name='author-list'),
    path('authors/create/', views.create_author, name='create-author'),

    path('categories/', views.category_list, name='category-list'),
    path('categories/create/', views.create_category, name='create-category'),

    path('books/', views.book_list, name='book-list'),
    path('books/create/', views.create_book, name='create-book'),
    path('books/<int:book_id>/', views.get_book, name='get-book'),
    path('books/<int:book_id>/update/', views.update_book, name='update-book'),
    path('books/<int:book_id>/delete/', views.delete_book, name='delete-book'),

    path('books/search/', views.search_books_by_title, name='search-books-by-title'),

]
