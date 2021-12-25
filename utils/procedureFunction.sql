DELIMITER $$
--
-- Procedury
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `p1` (IN `courseId` INT(11))  BEGIN
	UPDATE registrations SET attendance = attendance + 1 WHERE registrations.courseId = courseId;  
END$$

--
-- Funkcje
--
CREATE DEFINER=`root`@`localhost` FUNCTION `f1` (`instructorId` INT(11)) RETURNS DOUBLE(11,2) BEGIN
    DECLARE res DOUBLE(11,2);
	SELECT  SUM(earnings) INTO res FROM assignments WHERE assignments.instructorId = instructorId;
	RETURN (res);
END$$

DELIMITER ;