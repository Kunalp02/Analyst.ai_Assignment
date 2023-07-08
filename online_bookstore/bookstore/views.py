from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Author, Category, Book
from .serializers import AuthorSerializer, CategorySerializer, BookSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Book

@csrf_exempt
def author_list(request):
    authors = Author.objects.all()
    serializer = AuthorSerializer(authors, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def create_author(request):
    serializer = AuthorSerializer(data=request.POST)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def create_category(request):
    serializer = CategorySerializer(data=request.POST)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def book_list(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def create_book(request):
    serializer = BookSerializer(data=request.POST)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def get_book(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    serializer = BookSerializer(book)
    return JsonResponse(serializer.data)

@csrf_exempt
def update_book(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    serializer = BookSerializer(book, data=request.POST)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def delete_book(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    book.delete()
    return JsonResponse({"message": "Book deleted successfully."})


@csrf_exempt
def search_books_by_title(request):
    title = request.GET.get('title', '')
    print(title)
    books = Book.objects.filter(title__icontains=title)
    print(books)
    serializer = BookSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False)