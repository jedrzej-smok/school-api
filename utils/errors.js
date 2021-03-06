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

class NotFoundInstructorNameError extends Error{};
class SameInstructorNameError extends Error{};

class NotFoundCourseNameError extends Error{};
class SameCourseNameError extends Error{};

class NotFoundAssignmentNameError extends Error{};

class NotFoundParticipantNameError extends Error{};
class SameParticipantNameError extends Error{};

class NotFoundRegistrationNameError extends Error{};

class NotFoundRecordingNameError extends Error{};
class SameRecordingNameError extends Error{};
class AtLeastOneInstructorError extends Error{};

class ExtraError extends Error{};

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
            message: 'niewłaściwe hasło',
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
    //Instructor
    if(err instanceof NotFoundInstructorNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono instruktora o wskazanej nazwie',
        });
        return;
    }

    if(err instanceof SameInstructorNameError){
        res.status(400);
        res.send({
            message: 'Instruktor o podanej nazwie już istnieje',
        });
        return;
    }
    //Course
    if(err instanceof NotFoundCourseNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono kursu o wskazanej nazwie',
        });
        return;
    }

    if(err instanceof SameCourseNameError){
        res.status(400);
        res.send({
            message: 'Kurs o podanej nazwie już istnieje',
        });
        return;
    }
    //assignment
    if(err instanceof NotFoundAssignmentNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono przypisania instruktora do kursu',
        });
        return;
    }
    //registration
    if(err instanceof NotFoundRegistrationNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono rejestracji uczestnika do kursu',
        });
        return;
    }
    //recording
    if(err instanceof NotFoundRecordingNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono nagrania do kursu',
        });
        return;
    }
    if(err instanceof SameRecordingNameError){
        res.status(400);
        res.send({
            message: 'Nagranie o podanej nazwie już istnieje dla tego kursu',
        });
        return;
    }
    //Participant
    if(err instanceof NotFoundParticipantNameError){
        res.status(404);
        res.send({
            message: 'Nie znaleziono uczestnika o wskazanej nazwie',
        });
        return;
    }

    if(err instanceof SameParticipantNameError){
        res.status(400);
        res.send({
            message: 'Uczestnik o podanej nazwie już istnieje',
        });
        return;
    }
    if(err instanceof AtLeastOneInstructorError){
        res.status(400);
        res.send({
            message: 'Istnieje tylko 1 admin, nie można go usunąć',
        });
        return;
    }

    if(err instanceof ExtraError){
        res.status(400);
        res.send({
            message: 'Instrukotr nie ma uprawnien do kursu',
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
    SameDanceGenreNameError,
    NotFoundInstructorNameError,
    SameInstructorNameError,
    NotFoundCourseNameError,
    SameCourseNameError,
    NotFoundAssignmentNameError,
    NotFoundParticipantNameError,
    SameParticipantNameError,
    NotFoundRegistrationNameError,
    NotFoundRecordingNameError,
    SameRecordingNameError,
    AtLeastOneInstructorError,
    ExtraError
}