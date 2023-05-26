CREATE OR REPLACE TYPE Contact AS OBJECT (
  matricule VARCHAR2(50),
  nom VARCHAR2(50),
  poste VARCHAR2(50),
  departement VARCHAR2(50),
  MEMBER PROCEDURE show,
  CONSTRUCTOR FUNCTION Contact (matricule VARCHAR2, nom VARCHAR2, poste VARCHAR2, departement VARCHAR2) RETURN SELF AS RESULT
);
/

CREATE OR REPLACE TYPE BODY Contact AS
  CONSTRUCTOR FUNCTION Contact (matricule VARCHAR2, nom VARCHAR2, poste VARCHAR2, departement VARCHAR2) RETURN SELF AS RESULT IS
  BEGIN
    self.matricule := matricule;
    self.nom := nom;
    self.poste := poste;
    self.departement := departement;
    
    RETURN;
  END;

  MEMBER PROCEDURE show IS
  BEGIN
    DBMS_OUTPUT.PUT_LINE('Matricule : ' || self.matricule);
    DBMS_OUTPUT.PUT_LINE('Nom : ' || self.nom);
    DBMS_OUTPUT.PUT_LINE('Poste: ' || self.poste);
    DBMS_OUTPUT.PUT_LINE('Departement : ' || self.departement);
  END;
END;
/

CREATE OR REPLACE TYPE Email AS OBJECT (
  emeteur Contact,
  recepteur Contact,
  objet VARCHAR2(50),
  texte VARCHAR2(250),
  MEMBER PROCEDURE showEmail,
  CONSTRUCTOR FUNCTION Email (emeteur Contact, recepteur Contact, objet VARCHAR2, texte VARCHAR2) RETURN SELF AS RESULT
);
/

CREATE OR REPLACE TYPE BODY Email AS
  CONSTRUCTOR FUNCTION Email (emeteur Contact, recepteur Contact, objet VARCHAR2, texte VARCHAR2) RETURN SELF AS RESULT IS
  BEGIN
    self.emeteur := emeteur; 
    self.recepteur := recepteur;
    self.objet := objet;
    self.texte := texte;
    
    RETURN;
  END;

  MEMBER PROCEDURE showEmail IS
  BEGIN
    self.emeteur.show();
    self.recepteur.show();
    DBMS_OUTPUT.PUT_LINE('Objet : ' || self.objet);
    DBMS_OUTPUT.PUT_LINE('Texte: ' || self.texte);
  END;
END;
/

create table EMALES(
emeteur Contact,
  recepteur Contact,
  objet VARCHAR2(50),
  texte VARCHAR2(250)
);
/

insert into EMAILES values(Contact('N°15203', 'EMETEUR_1', 'poste1', 'Dep1'),Contact('N°203', 'RECEPTEUR_1', 'poste5', 'Dep7'),'objet1','texte1');/
insert into EMAILES values(Contact('N°18204', 'EMETEUR_2', 'poste3', 'Dep2'),Contact('N°152', 'RECEPTEUR_2', 'poste6', 'Dep8'),'objet2','texte2');/
insert into EMAILES values(Contact('N°24505', 'EMETEUR_3', 'poste4', 'Dep3'),Contact('N°520', 'RECEPTEUR_3', 'poste7', 'Dep9'),'objet3','texte3');/


 select e.emeteur.nom from EMAILES e where e.emeteur.nom='EMETEUR_1';/

 select e.emeteur.nom from EMAILES e ORDER BY e.emeteur.nom DESC;/

 delete from EMAILES e where e.emeteur.matricule='N°15203';/