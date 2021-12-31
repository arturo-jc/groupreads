const formatBookData = bookData => {
    const book = {
        title: bookData.volumeInfo.title || "untitled",
        subtitle: bookData.volumeInfo.subtitle,
        authors: bookData.volumeInfo.authors || ["unknown author"],
        publisher: bookData.volumeInfo.publisher,
        publishedOn: bookData.volumeInfo.publishedDate,
        description: bookData.volumeInfo.description,
        industryIdentifiers: bookData.volumeInfo.industryIdentifiers,
        pageCount: bookData.volumeInfo.pageCount,
        googleBooksUrl: bookData.selfLink
    }

    if (bookData.volumeInfo.imageLinks){
        book.imageUrl = bookData.volumeInfo.imageLinks.smallThumbnail
    }

    return book;
}

export default formatBookData;