const formatBookData = bookData => {
    return {
        title: bookData.volumeInfo.title || "untitled",
        subtitle: bookData.volumeInfo.subtitle,
        authors: bookData.volumeInfo.authors || ["unknown author"],
        publisher: bookData.volumeInfo.publisher,
        publishedOn: bookData.volumeInfo.publishedDate,
        description: bookData.volumeInfo.description,
        industryIdentifiers: bookData.volumeInfo.industryIdentifiers,
        pageCount: bookData.volumeInfo.pageCount,
        imageUrl: bookData.volumeInfo.imageLinks.smallThumbnail,
        googleBooksUrl: bookData.selfLink
    };
}

export default formatBookData;