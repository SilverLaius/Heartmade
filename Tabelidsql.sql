-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `Ostud`

CREATE TABLE `Ostud`
(
 `OstuID`      INTEGER NOT NULL AUTO_INCREMENT ,
 `SessiooniID` INTEGER ,
 `Ostuaeg`     DATETIME ,
 `MakseID`     INTEGER ,

PRIMARY KEY (`OstuID`)
);






-- ************************************** `Kasutajaliik`

CREATE TABLE `Kasutajaliik`
(
 `LiikID`   INTEGER NOT NULL AUTO_INCREMENT ,
 `Kasutaja` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`LiikID`)
);






-- ************************************** `Keeletahised`

CREATE TABLE `Keeletahised`
(
 `KeeletahisID` INTEGER NOT NULL AUTO_INCREMENT ,
 `Tahis`        VARCHAR(45) NOT NULL ,

PRIMARY KEY (`KeeletahisID`)
);






-- ************************************** `Staatused`

CREATE TABLE `Staatused`
(
 `StaatusID` INTEGER NOT NULL AUTO_INCREMENT ,
 `Nimetus`   VARCHAR(45) NOT NULL ,

PRIMARY KEY (`StaatusID`)
);






-- ************************************** `Tooteliigid`

CREATE TABLE `Tooteliigid`
(
 `LiikID`  INTEGER NOT NULL AUTO_INCREMENT ,
 `Nimetus` VARCHAR(100) NOT NULL ,

PRIMARY KEY (`LiikID`)
);






-- ************************************** `Kasutajad`

CREATE TABLE `Kasutajad`
(
 `KasutajaID`    INTEGER NOT NULL AUTO_INCREMENT ,
 `Eesnimi`       VARCHAR(100) ,
 `Perekonnanimi` VARCHAR(100) ,
 `E_post`        VARCHAR(100) NOT NULL ,
 `Parool`        VARCHAR(45) ,
 `Isikukood`     VARCHAR(45) NOT NULL ,
 `Mobiil`        VARCHAR(45) ,
 `LiikID`        INTEGER NOT NULL ,
 `Liitunud`      DATETIME NOT NULL ,
 `StaatusID`     INTEGER NOT NULL ,

PRIMARY KEY (`KasutajaID`),
KEY `fkIdx_200` (`LiikID`),
CONSTRAINT `FK_200` FOREIGN KEY `fkIdx_200` (`LiikID`) REFERENCES `Kasutajaliik` (`LiikID`)
);






-- ************************************** `Tootemarksonad`

CREATE TABLE `Tootemarksonad`
(
 `MarksonaID` INTEGER NOT NULL AUTO_INCREMENT ,
 `Sona`       VARCHAR(90) NOT NULL ,
 `StaatusID`  INTEGER NOT NULL ,

PRIMARY KEY (`MarksonaID`),
KEY `fkIdx_260` (`StaatusID`),
CONSTRAINT `FK_260` FOREIGN KEY `fkIdx_260` (`StaatusID`) REFERENCES `Staatused` (`StaatusID`)
);






-- ************************************** `Toodete_nimetused`

CREATE TABLE `Toodete_nimetused`
(
 `SeoseID`      INTEGER NOT NULL AUTO_INCREMENT ,
 `Tootekood`    INTEGER NOT NULL ,
 `Nimetus`      VARCHAR(100) NOT NULL ,
 `KeeletahisID` INTEGER NOT NULL ,

PRIMARY KEY (`SeoseID`),
KEY `fkIdx_239` (`KeeletahisID`),
CONSTRAINT `FK_239` FOREIGN KEY `fkIdx_239` (`KeeletahisID`) REFERENCES `Keeletahised` (`KeeletahisID`)
);






-- ************************************** `Tooted`

CREATE TABLE `Tooted`
(
 `Tootekood`      INTEGER NOT NULL AUTO_INCREMENT ,
 `Hind`           DOUBLE NOT NULL ,
 `Kirjeldus`      TEXT NOT NULL ,
 `Lisamisaeg`     DATETIME NOT NULL ,
 `LiikID`         INTEGER NOT NULL ,
 `StaatusID`      INTEGER NOT NULL ,
 `Materjalid`     TEXT ,
 `Hooldus`        TEXT ,
 `Saatmisinfo`    TEXT ,
 `Tagastamisinfo` TEXT ,

PRIMARY KEY (`Tootekood`),
KEY `fkIdx_203` (`LiikID`),
CONSTRAINT `FK_203` FOREIGN KEY `fkIdx_203` (`LiikID`) REFERENCES `Tooteliigid` (`LiikID`),
KEY `fkIdx_206` (`StaatusID`),
CONSTRAINT `FK_206` FOREIGN KEY `fkIdx_206` (`StaatusID`) REFERENCES `Staatused` (`StaatusID`)
);






-- ************************************** `Tootekategooriad`

CREATE TABLE `Tootekategooriad`
(
 `KategooriaID` INTEGER NOT NULL AUTO_INCREMENT ,
 `Teema`        VARCHAR(150) NOT NULL ,
 `StaatusID`    INTEGER NOT NULL ,

PRIMARY KEY (`KategooriaID`),
KEY `fkIdx_251` (`StaatusID`),
CONSTRAINT `FK_251` FOREIGN KEY `fkIdx_251` (`StaatusID`) REFERENCES `Staatused` (`StaatusID`)
);






-- ************************************** `Ostukorv`

CREATE TABLE `Ostukorv`
(
 `SeoseID`    INTEGER NOT NULL AUTO_INCREMENT ,
 `Tootekood`  INTEGER ,
 `OstuID`     INTEGER ,
 `KasutajaID` INTEGER ,

PRIMARY KEY (`SeoseID`),
KEY `fkIdx_282` (`Tootekood`),
CONSTRAINT `FK_282` FOREIGN KEY `fkIdx_282` (`Tootekood`) REFERENCES `Tooted` (`Tootekood`),
KEY `fkIdx_285` (`OstuID`),
CONSTRAINT `FK_285` FOREIGN KEY `fkIdx_285` (`OstuID`) REFERENCES `Ostud` (`OstuID`),
KEY `fkIdx_288` (`KasutajaID`),
CONSTRAINT `FK_288` FOREIGN KEY `fkIdx_288` (`KasutajaID`) REFERENCES `Kasutajad` (`KasutajaID`)
);






-- ************************************** `Toodete_tagasiside`

CREATE TABLE `Toodete_tagasiside`
(
 `TagasisideID`  INTEGER NOT NULL AUTO_INCREMENT ,
 `Nimi`          VARCHAR(100) NOT NULL ,
 `E_post`        VARCHAR(100) NOT NULL ,
 `Rating`        INTEGER ,
 `Kommentaar`    TEXT NOT NULL ,
 `Website`       VARCHAR(150) NOT NULL ,
 `Sisestamisaeg` DATETIME NOT NULL ,
 `Tootekood`     INTEGER NOT NULL ,
 `StaatusID`     INTEGER NOT NULL ,

PRIMARY KEY (`TagasisideID`, `Tootekood`),
KEY `fkIdx_225` (`Tootekood`),
CONSTRAINT `FK_225` FOREIGN KEY `fkIdx_225` (`Tootekood`) REFERENCES `Tooted` (`Tootekood`),
KEY `fkIdx_248` (`StaatusID`),
CONSTRAINT `FK_248` FOREIGN KEY `fkIdx_248` (`StaatusID`) REFERENCES `Staatused` (`StaatusID`)
);






-- ************************************** `Toodete_failid`

CREATE TABLE `Toodete_failid`
(
 `SeoseID`   INTEGER NOT NULL ,
 `Pealkiri`  VARCHAR(100) NOT NULL ,
 `Tootekood` INTEGER NOT NULL ,

PRIMARY KEY (`SeoseID`),
KEY `fkIdx_213` (`Tootekood`),
CONSTRAINT `FK_213` FOREIGN KEY `fkIdx_213` (`Tootekood`) REFERENCES `Tooted` (`Tootekood`)
);






-- ************************************** `Toodete_pildid`

CREATE TABLE `Toodete_pildid`
(
 `SeoseID`   INTEGER NOT NULL AUTO_INCREMENT ,
 `Nimetus`   VARCHAR(100) NOT NULL ,
 `Tootekood` INTEGER NOT NULL ,

PRIMARY KEY (`SeoseID`),
KEY `fkIdx_209` (`Tootekood`),
CONSTRAINT `FK_209` FOREIGN KEY `fkIdx_209` (`Tootekood`) REFERENCES `Tooted` (`Tootekood`)
);






-- ************************************** `Toodete_marksonad`

CREATE TABLE `Toodete_marksonad`
(
 `SeoseID`    INTEGER NOT NULL AUTO_INCREMENT ,
 `Tootekood`  INTEGER NOT NULL ,
 `MarksonaID` INTEGER NOT NULL ,

PRIMARY KEY (`SeoseID`),
KEY `fkIdx_217` (`Tootekood`),
CONSTRAINT `FK_217` FOREIGN KEY `fkIdx_217` (`Tootekood`) REFERENCES `Tooted` (`Tootekood`),
KEY `fkIdx_263` (`MarksonaID`),
CONSTRAINT `FK_263` FOREIGN KEY `fkIdx_263` (`MarksonaID`) REFERENCES `Tootemarksonad` (`MarksonaID`)
);






-- ************************************** `Toodete_kategooriad`

CREATE TABLE `Toodete_kategooriad`
(
 `SeoseID`      INTEGER NOT NULL AUTO_INCREMENT ,
 `Tootekood`    INTEGER NOT NULL ,
 `KategooriaID` INTEGER NOT NULL ,

PRIMARY KEY (`SeoseID`),
KEY `fkIdx_221` (`Tootekood`),
CONSTRAINT `FK_221` FOREIGN KEY `fkIdx_221` (`Tootekood`) REFERENCES `Tooted` (`Tootekood`),
KEY `fkIdx_242` (`KategooriaID`),
CONSTRAINT `FK_242` FOREIGN KEY `fkIdx_242` (`KategooriaID`) REFERENCES `Tootekategooriad` (`KategooriaID`)
);





