class ValidationError extends Error{
};
class NotFoundError extends Error{};
class NotFoundUserNameError extends Error{};
class InvalidPasswordError extends Error{};

class NotFoundLevelNameError extends Error{};
class SameLevelNameError extends Error{};

class NotFoundRoomNameError extends Error{};
class SameRoomNameError extends Error{};

class NotFoundPerformerNameError extends Error{};
class SamePerformerNameError extends Error{};

class NotFoundSongNameError extends Error{};
class SameSongNameError extends Error{};

class NotFoundDanceGenreNameError extends Error{};
class SameDanceGenreNameError extends Error{};

function handleError(err,req,res,next){
    if(err instanceof NotFoundError){
        res.status(404);
        res.render('error',{
            message: 'nie mozna znalezc elemtnu o danym id',
        });
        return;
    }

    if(err instanceof NotFoundUserNameError){
        res.status(401);
        res.send({
            message: 'Nie znaleziono nazwy uzytkownika',
        });
        return;
    }
    if(err instanceof InvalidPasswordError){
        res.status(401);
        res.send({
            message: 'Nie właściwe hasło',
        });
        return;
    }
    //level
    if(err instanceof NotFoundLevelNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono poziomu o danej nazwie',
        });
        return;
    }

    if(err instanceof SameLevelNameError){
        res.status(400);
        res.send({
            message: 'Poziom o podanej nazwie już istnieje',
        });
        return;
    }
    //room
    if(err instanceof NotFoundRoomNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono sali o danej nazwie',
        });
        return;
    }

    if(err instanceof SameRoomNameError){
        res.status(400);
        res.send({
            message: 'Sala o podanej nazwie już istnieje',
        });
        return;
    }
    //performer
    if(err instanceof NotFoundPerformerNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono wykonawcy o danej nazwie',
        });
        return;
    }

    if(err instanceof SamePerformerNameError){
        res.status(400);
        res.send({
            message: 'Wykonawca o podanej nazwie już istnieje',
        });
        return;
    }
    //song
    if(err instanceof NotFoundSongNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono piosenki o danej nazwie',
        });
        return;
    }

    if(err instanceof SameSongNameError){
        res.status(400);
        res.send({
            message: 'Piosenka o podanej nazwie już istnieje',
        });
        return;
    }
    //danceGerne
    if(err instanceof NotFoundDanceGenreNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono gatunku tańca o danej nazwie',
        });
        return;
    }

    if(err instanceof SameDanceGenreNameError){
        res.status(400);
        res.send({
            message: 'Gatunek tańca o podanej nazwie już istnieje',
        });
        return;
    }



    console.error(err.message);
    res.status( err instanceof ValidationError ? 400 : 500);
    res.send({
        message: err instanceof ValidationError ? err.message : 'blad serwera',
    });
}
module.exports={
    handleError,
    ValidationError,
    NotFoundError,
    NotFoundUserNameError,
    InvalidPasswordError,
    NotFoundLevelNameError,
    SameLevelNameError,
    NotFoundRoomNameError,
    SameRoomNameError,
    NotFoundPerformerNameError,
    SamePerformerNameError,
    NotFoundSongNameError,
    SameSongNameError,
    NotFoundDanceGenreNameError,
    SameDanceGenreNameError
}