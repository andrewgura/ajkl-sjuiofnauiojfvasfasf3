-- 1. Drop table if exists
DECLARE
    table_exists NUMBER;
BEGIN
    SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'SUPPORT_FILES';
    IF table_exists > 0 THEN
        EXECUTE IMMEDIATE 'DROP TABLE SUPPORT_FILES';
    END IF;
END;
/

-- 2. Create SupportFiles table
CREATE TABLE SUPPORT_FILES (
    ID NUMBER PRIMARY KEY,
    TITLE NVARCHAR2 (200) NOT NULL,
    FILE_URL NVARCHAR2 (500), -- Will be null/empty for now until file storage is implemented
    DESCRIPTION NVARCHAR2 (1000),
    FILE_SIZE NVARCHAR2 (50),
    FILE_TYPE NVARCHAR2 (100),
    VISIBLE NUMBER(1) DEFAULT 1 CHECK (VISIBLE IN (0, 1)),
    GROUPS NVARCHAR2 (500), -- TODO user permissions
    CREATED_BY VARCHAR2(255) NOT NULL,
    CREATED_DATE DATE DEFAULT SYSDATE,
    UPDATED_BY VARCHAR2(255),
    UPDATED_DATE DATE
);

-- 3. Create sequence for auto-incrementing ID
CREATE SEQUENCE SUPPORT_FILES_SEQ
START WITH 1 INCREMENT BY 1 CACHE 20;

-- 4. Create trigger for auto-incrementing ID
CREATE OR REPLACE TRIGGER SUPPORT_FILES_ID_TRG
    BEFORE INSERT ON SUPPORT_FILES
    FOR EACH ROW
BEGIN
    IF :NEW.ID IS NULL THEN
        SELECT SUPPORT_FILES_SEQ.NEXTVAL INTO :NEW.ID FROM DUAL;
    END IF;
END;
/

-- 5. Create indexes for performance
CREATE INDEX IDX_SUPPORT_FILES_VISIBLE ON SUPPORT_FILES (VISIBLE);

CREATE INDEX IDX_SUPPORT_FILES_CREATED_DATE ON SUPPORT_FILES (CREATED_DATE);

CREATE INDEX IDX_SUPPORT_FILES_TITLE ON SUPPORT_FILES (TITLE);

-- 6. Seed test data
INSERT INTO
    SUPPORT_FILES (
        ID,
        TITLE,
        FILE_URL,
        DESCRIPTION,
        FILE_SIZE,
        FILE_TYPE,
        VISIBLE,
        GROUPS,
        CREATED_BY,
        CREATED_DATE
    )
VALUES (
        1,
        'AAP User Guide',
        '', -- Empty for now until file storage is implemented
        'Complete guide for Airspace Access Program users',
        '2.4 MB',
        'pdf',
        1,
        '["AAP User", "Admin"]',
        'system',
        TO_DATE(
            '2024-03-29 17:16',
            'YYYY-MM-DD HH24:MI'
        )
    );

INSERT INTO
    SUPPORT_FILES (
        ID,
        TITLE,
        FILE_URL,
        DESCRIPTION,
        FILE_SIZE,
        FILE_TYPE,
        VISIBLE,
        GROUPS,
        CREATED_BY,
        CREATED_DATE
    )
VALUES (
        2,
        'LEO Contacts',
        '', -- Empty for now until file storage is implemented
        'Law Enforcement Officer contact information directory',
        '533.8 KB',
        'pdf',
        1,
        '["Admin"]',
        'system',
        TO_DATE(
            '2024-11-18 17:48',
            'YYYY-MM-DD HH24:MI'
        )
    );

INSERT INTO
    SUPPORT_FILES (
        ID,
        TITLE,
        FILE_URL,
        DESCRIPTION,
        FILE_SIZE,
        FILE_TYPE,
        VISIBLE,
        GROUPS,
        CREATED_BY,
        CREATED_DATE
    )
VALUES (
        3,
        'AAP VDD',
        '', -- Empty for now until file storage is implemented
        'Technical document detailing v1.24 software changes, bug fixes & IAPWG workflow updates',
        '1.8 MB',
        'pdf',
        1,
        '["AAP User", "FAA User", "Admin"]',
        'system',
        TO_DATE(
            '2025-01-15 09:23',
            'YYYY-MM-DD HH24:MI'
        )
    );

INSERT INTO
    SUPPORT_FILES (
        ID,
        TITLE,
        FILE_URL,
        DESCRIPTION,
        FILE_SIZE,
        FILE_TYPE,
        VISIBLE,
        GROUPS,
        CREATED_BY,
        CREATED_DATE
    )
VALUES (
        4,
        'Manifest Testing',
        '', -- Empty for now until file storage is implemented
        'Zip file containing multiple csv files with test data',
        '4.2 MB',
        'zip',
        1,
        '["FAA User", "Admin"]',
        'system',
        TO_DATE(
            '2024-12-05 14:32',
            'YYYY-MM-DD HH24:MI'
        )
    );

INSERT INTO
    SUPPORT_FILES (
        ID,
        TITLE,
        FILE_URL,
        DESCRIPTION,
        FILE_SIZE,
        FILE_TYPE,
        VISIBLE,
        GROUPS,
        CREATED_BY,
        CREATED_DATE
    )
VALUES (
        5,
        'IAPWG Tutorial',
        '', -- Empty for now until file storage is implemented
        'Video tutorial for Interagency Airspace Protection Working Group processes',
        '76.5 MB',
        'mp4',
        0,
        '["AAP User", "FAA User", "Admin"]',
        'system',
        TO_DATE(
            '2025-02-10 11:15',
            'YYYY-MM-DD HH24:MI'
        )
    );

COMMIT;