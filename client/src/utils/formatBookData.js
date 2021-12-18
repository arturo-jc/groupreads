const formatBookData = rawBookData => {
    return {
        title: rawBookData.volumeInfo.title,
        subtitle: rawBookData.volumeInfo.subtitle,
        authors: rawBookData.volumeInfo.authors,
        publisher: rawBookData.volumeInfo.publisher,
        publishedOn: rawBookData.volumeInfo.publishedDate,
        description: rawBookData.volumeInfo.description,
        industryIdentifiers: rawBookData.volumeInfo.industryIdentifiers,
        pageCount: rawBookData.volumeInfo.pageCount,
        imageUrl: rawBookData.volumeInfo.imageLinks.smallThumbnail,
        googleBooksUrl: rawBookData.selfLink
    };
}

export default formatBookData;