--Inserts en tipo usuario
INSERT INTO public.tipousuario(
	rol, fecha_inicio, estado)
	VALUES ('admin', current_date, 'activo');

INSERT INTO public.tipousuario(
rol, fecha_inicio, estado)
VALUES ('cliente', current_date, 'activo');

--Insert usuario administrador
INSERT INTO public.usuario(
	nombre, correo, contrasenia, telefono, direccion, tipo_usuario_idtipo_usuario, fecharegistro)
	VALUES ('Signe', 'admin@email.com', '$2b$10$9i.gUqog92qBF2sGbWARfeLRN6utq7r.8Zr8yLq7REqwk8EGCg4Jq', '56326541', 'Honduras', 1, CURRENT_DATE);

INSERT INTO public.departamento(descripcion)VALUES ('ATLÁNTIDA');
INSERT INTO public.departamento(descripcion)VALUES ('COLÓN');
INSERT INTO public.departamento(descripcion)VALUES ('COMAYAGUA');
INSERT INTO public.departamento(descripcion)VALUES ('COPÁN');
INSERT INTO public.departamento(descripcion)VALUES ('CORTÉS');
INSERT INTO public.departamento(descripcion)VALUES ('CHOLUTECA');
INSERT INTO public.departamento(descripcion)VALUES ('EL PARAISO');
INSERT INTO public.departamento(descripcion)VALUES ('FRANCISCO MORAZÁN');
INSERT INTO public.departamento(descripcion)VALUES ('GRACIAS A DIOS');
INSERT INTO public.departamento(descripcion)VALUES ('INTIBUCÁ');
INSERT INTO public.departamento(descripcion)VALUES ('ISLAS DE LA BAHÍA');
INSERT INTO public.departamento(descripcion)VALUES ('LA PAZ');
INSERT INTO public.departamento(descripcion)VALUES ('LEMPIRA');
INSERT INTO public.departamento(descripcion)VALUES ('OCOTEPEQUE');
INSERT INTO public.departamento(descripcion)VALUES ('OLANCHO');
INSERT INTO public.departamento(descripcion)VALUES ('SANTA BÁRBARA');
INSERT INTO public.departamento(descripcion)VALUES ('VALLE');
INSERT INTO public.departamento(descripcion)VALUES ('YORO');

INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA CEIBA', 1);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('EL PORVENIR', 1);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('ESPARTA', 1);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('JUTIAPA', 1);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA MASISA', 1);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN FRANCISCO', 1);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TELA', 1);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('ARIZONA', 1);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TRUJILLO',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('BALFATE',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('IRIONA',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LIMÓN',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SABÁ',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SANTA FÉ',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SANTA ROSA DE AGUÁN',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SONAGUERA',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TOCOA',2);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('BONITO ORIENTAL',2);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('COMAYAGUA',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('AJUTERIQUE',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('EL ROSARIO',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('ESQUÍAS',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('HUMUYA',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA LIBERTAD',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LAMANÍ',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA TRINIDAD',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LEJAMANÍ',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('MEÁMBAR',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('MINAS DE ORO',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('OJOS DE AGUA',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN JERÓNIMO',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN JOSÉ DE COMAYAGUA',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN JOSÉ DEL POTRERO',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN LUIS',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN SEBASTIÁN',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SIGUATEPEQUE',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('VILLA DE SAN ANTONIO',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LAS LAJAS',3);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TAULABÉ',3);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SANTA ROSA DE COPÁN',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CABAÑAS',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CONCEPCIÓN',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('COPÁN RUINAS',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CORQUÍN',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CUCUYAGUA',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('DOLORES',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('DULCE NOMBRE',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('EL PARAÍSO',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('FLORIDA',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA JIGUA',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA UNIÓN',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('NUEVA ARCADIA',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN AGUSTÍN',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN ANTONIO',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN JERÓNIMO',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN JOSÉ',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN JUAN DE OPOA',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN NICOLÁS',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN PEDRO',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SANTA RITA',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TRINIDAD DE COPÁN',4);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('VERACRUZ',4);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN PEDRO SULA',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CHOLOMA',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('OMOA',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('PIMIENTA',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('POTRERILLOS',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('PUERTO CORTÉS',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN ANTONIO DE CORTÉS',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN FRANCISCO DE YOJOA',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN MANUEL',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SANTA CRUZ DE YOJOA',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('VILLANUEVA',5);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA LIMA',5);


INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CHOLUTECA',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('APACILAGUA',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CONCEPCIÓN DE MARÍA',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('DUYURE',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('EL CORPUS',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('EL TRIUNFO',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('MARCOVIA',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('MOROLICA',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('NAMASIGUE',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('OROCUINA',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('PESPIRE',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN ANTONIO DE FLORES',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN ISIDRO',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN JOSÉ',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN MARCOS DE COLÓN',6);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SANTA ANA DE YUSGUARE',6);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('YUSCARÁN',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('ALAUCA',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('DANLÍ',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('EL PARAÍSO',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('GUINOPE',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('JACALEAPA',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LIURE',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('MOROCELÍ',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('OROPOLÍ',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('POTRERILLOS',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN ANTONIO DE FLORES',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN LUCAS',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN MATÍAS',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SOLEDAD',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TEUPASENTI',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TEXIGUAT',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('VADO ANCHO',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('YAUYUPE',7);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TROJES',7);


INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('ALUBARÉN',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('DISTRITO CENTRAL',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CEDROS',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CURARÉN',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('EL PORVENIR',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('GUAIMACA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA LIBERTAD',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LA VENTA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('LEPATERIQUE',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('MARAITA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('MARALE',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('NUEVA ARMENIA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('OJOJONA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('ORICA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('REITOCA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SABANAGRANDRE',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN ANTONIO DE ORIENTE',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN BUENAVENTURA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN IGNACIO',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('CANTARRANAS',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SAN MIGUELITO',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SANTA ANA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('SANTA LUCÍA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TALANGA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('TATUMBLA',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('VALLE DE ANGELES',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('VILLA DE SAN FRANCISCO',8);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('VALLECILLO',8);


INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('PUERTO LEMPIRA', 9);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('BRUS LAGUNA', 9);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('AHUAS', 9);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('JUAN FRANCISCO BULNES', 9);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('RAMÓN VILLEDA MORALES', 9);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento)VALUES ('WAMPUSIRPE', 9);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA ESPERANZA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CAMASCA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('COLOMONCAGUA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CONCEPCIÓN', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('DOLORES', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('INTIBUCÁ', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('JESÚS DE OTORO', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MAGDALENA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MASAGUARA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN ANTONIO', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN ISIDRO', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN JUAN', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN MARCOS DE LA SIERRA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN MIGUEL GUANCAPLA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA LUCÍA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('YAMARANGUILA', 10);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN FRANCISCO DE OPALACA', 10);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ROATÁN', 11);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUANAJA', 11);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('JOSÉ SANTOS GUARDIOLA', 11);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('UTILA', 11);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA PAZ', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('AGUANQUETERIQUE', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CABAÑAS', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CANE', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CHINACLA', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUAJIQUIRO', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LAUTERIQUE', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MARCALA', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MERCEDES DE ORIENTE', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('OPATORO', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN ANTONIO DEL NORTE', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN JOSÉ', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN JUAN', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN PEDRO DE TUTULE', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA ANA', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA ELENA', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA MARIA', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTIAGO DE PURINGLA', 12);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('YARULA', 12);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GRACIAS', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('BELÉN', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CANDELARIA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('COLOLACA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ERANDIQUE', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUALCINCE', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUARITA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA CAMPA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA IGUALA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LAS FLORES', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA UNIÓN', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA VIRTUD', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LEPAERA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MAPULACA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('PIRAERA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN ANDRÉS', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN FRANCISCO', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN JUAN GUARITA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN MANUEL COLOHETE', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN RAFAEL', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN SEBASTIÁN', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA CRUZ', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('TALGUA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('TAMBLA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('TOMALÁ', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('VALLADOLID', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('VIRGINIA', 13);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN MARCOS DE CAIQUÍN', 13);


INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('NUEVA OCOTEPEQUE', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('BELÉN GUALCHO', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CONCEPCIÓN', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('DOLORES MERENDÓN', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('FRATERNIDAD', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA ENCARNACIÓN', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA LABOR', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LUCERNA', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MERCEDES', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN FERNANDO', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN FRANCISCO DEL VALLE', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN JORGE', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN MARCOS', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA FE', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SENSENTI', 14);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SINUAPA', 14);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('JUTICALPA', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CAMPAMENTO', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CATACAMAS', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CONCORDIA', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('DULCE NOMBRE DE CULMÍ', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('EL ROSARIO', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ESQUIPULAS DEL NORTE', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUALACO', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUARIZAMA', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUATA', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUAYAPE', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('JANO', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LA UNIÓN', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MANGULILE', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MANTO', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SALAMÁ', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN ESTEBAN', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN FRANCISCO DE BECERRA', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN FRANCISCO DE LA PAZ', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA MARIA DEL REAL', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SILCA', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('YOCÓN', 15);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('PATUCA', 15);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA BÁRBARA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ARADA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ATIMA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('AZACUALPA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CEGUACA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN JOSÉ DE LAS COLINAS', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CONCEPCIÓN DEL NORTE', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CONCEPCIÓN DEL SUR', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CHINDA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('EL NÍSPERO', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GUALALA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ILAMA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MACUELIZO', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('NARANJITO', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('NUEVO CELILAC', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('PETOA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('PROTECCIÓN', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('QUIMISTÁN', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN FRANCISCO DE OJUERA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN LUIS', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN MARCOS', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN NICOLÁS', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN PEDRO ZACAPA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA RITA', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN VICENTE CENTENARIO', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('TRINIDAD', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LAS VEGAS', 16);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('NUEVA FRONTERA', 16);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ALIANZA', 17);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('AMAPALA', 17);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ARAMECINA', 17);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('CARIDAD', 17);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('GOASCORÁN', 17);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('LANGUE', 17);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('NACAOME', 17);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN FRANCISCO DE CORAY', 17);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SAN LORENZO', 17);

INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('YORO', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('ARENAL', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('EL NEGRITO', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('EL PROGRESO', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('JOCÓN', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('MORAZÁN', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('OLANCHITO', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SANTA RITA', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('SULACO', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('VICTORIA', 18);
INSERT INTO public.municipio(descripcion, departamento_iddepartamento) VALUES ('YORITO', 18);

INSERT INTO public.tipobase(descripcion)VALUES ('Plato de cerámica');
INSERT INTO public.tipobase(descripcion)VALUES ('Bicicleta');
INSERT INTO public.tipobase(descripcion)VALUES ('Macetera esférica de vidrio grande');
INSERT INTO public.tipobase(descripcion)VALUES ('Macetera esférica de vidrio pequeño');
INSERT INTO public.tipobase(descripcion)VALUES ('Vaso de vidrio ');
INSERT INTO public.tipobase(descripcion)VALUES ('Macetera cuadrada de vidrio pequeña');
INSERT INTO public.tipobase(descripcion)VALUES ('Macetera de plástico negro');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera con alambre LxAxH cm y cristal Ø 4 cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera con alambre y cristal Ø 6 cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera con alambre y cristal  Ø 8 cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera  y cristal pequeño Ø 4 cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Macetera de barro grande');
INSERT INTO public.tipobase(descripcion)VALUES ('Macetera de barro h 8 cm, Ø 5cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de alambre cuadrada con macetera de plástico colgante');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de alambre cuadrada con macetera de cerámica colgante');
INSERT INTO public.tipobase(descripcion)VALUES ('Macetera de cerámica h 8 cm, Ø 5cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera con alambre en forma de corazón LxAxH cm y cristal Ø 4 cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera con alambre  Love LxAxH cm y cristal Ø 4 cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Muñequito');
INSERT INTO public.tipobase(descripcion)VALUES ('Caja de madera 10x8x8 cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Tripode de madera');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera cuadrada');
INSERT INTO public.tipobase(descripcion)VALUES ('Balde de plástico h cm, Ø');
INSERT INTO public.tipobase(descripcion)VALUES ('Balde de metal gris h cm, Ø');
INSERT INTO public.tipobase(descripcion)VALUES ('Balde de metal blanco  h cm, Ø');
INSERT INTO public.tipobase(descripcion)VALUES ('Bote de vidrio con mango y tapadera h cm, Ø');
INSERT INTO public.tipobase(descripcion)VALUES ('Carretitas');
INSERT INTO public.tipobase(descripcion)VALUES ('Macetera de vidrio cuadrada LxAxH cm');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera triangular  AxLxH cm y cristal de Ø 4cm ');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera con alambre doble AxL xH1 y H2 cm y dos cristales de Ø 4 cm c/u');
INSERT INTO public.tipobase(descripcion)VALUES ('Base de madera cuadrada  AxLxH cm y cristal de Ø 6 cm');

INSERT INTO public.categoria(descripcion)VALUES ('Maceteras de barro');
INSERT INTO public.categoria(descripcion)VALUES ('Maceteras de cerámica');
INSERT INTO public.categoria(descripcion)VALUES ('Terrarios colgantes');
INSERT INTO public.categoria(descripcion)VALUES ('Terrarios');
INSERT INTO public.categoria(descripcion)VALUES ('Mini terrarios');
INSERT INTO public.categoria(descripcion)VALUES ('Cajitas');
INSERT INTO public.categoria(descripcion)VALUES ('Arreglos');
INSERT INTO public.categoria(descripcion)VALUES ('Bicicletas');
INSERT INTO public.categoria(descripcion)VALUES ('Muñequitos');
INSERT INTO public.categoria(descripcion)VALUES ('Baldes');
INSERT INTO public.categoria(descripcion)VALUES ('Maceteras de vidrio');
INSERT INTO public.categoria(descripcion)VALUES ('Carretitas');









