class ValidationError extends Error{
};
class NotFoundError extends Error{};
class NotFoundUserNameError extends Error{};
class InvalidPasswordError extends Error{};

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
}