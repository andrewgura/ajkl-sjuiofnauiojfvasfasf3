-- 1. Drop tables if they exist (in reverse order due to foreign key constraints)
DECLARE
  table_exists NUMBER;
BEGIN
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'GROUPMEMBERS';
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE GroupMembers';
  END IF;
END;
/

DECLARE
  table_exists NUMBER;
BEGIN
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'GROUPS';
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE Groups';
  END IF;
END;
/

-- 2. Create Groups table
CREATE TABLE Groups (
    ID VARCHAR2(255) PRIMARY KEY,
    Name VARCHAR2(255) NOT NULL,
    Description CLOB,
    CreatedBy VARCHAR2(255) DEFAULT 'system',
    CreatedDate DATE DEFAULT SYSDATE,
    UpdatedBy VARCHAR2(255),
    UpdatedDate DATE,
    IsActive CHAR(1) DEFAULT 'Y' CHECK (IsActive IN ('Y', 'N'))
);

-- 3. Create GroupMembers table
CREATE TABLE GroupMembers (
    ID VARCHAR2(255) PRIMARY KEY,
    GroupID VARCHAR2(255) NOT NULL,
    Name VARCHAR2(255) NOT NULL,
    Email VARCHAR2(255) NOT NULL,
    CreatedBy VARCHAR2(255) DEFAULT 'system',
    CreatedDate DATE DEFAULT SYSDATE,
    UpdatedBy VARCHAR2(255),
    UpdatedDate DATE,
    IsActive CHAR(1) DEFAULT 'Y' CHECK (IsActive IN ('Y', 'N')),
    CONSTRAINT FK_GroupMembers_GroupID FOREIGN KEY (GroupID) REFERENCES Groups (ID) ON DELETE CASCADE
);

-- 4. Create indexes for better performance
CREATE INDEX IDX_Groups_Name ON Groups (Name);

CREATE INDEX IDX_Groups_IsActive ON Groups (IsActive);

CREATE INDEX IDX_GroupMembers_GroupID ON GroupMembers (GroupID);

CREATE INDEX IDX_GroupMembers_Email ON GroupMembers (Email);

CREATE INDEX IDX_GroupMembers_IsActive ON GroupMembers (IsActive);

-- 5. Insert sample groups
INSERT INTO
    Groups (
        ID,
        Name,
        Description,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'group-1',
        'Operations Team',
        'Primary notification group for operational communications',
        'system',
        SYSDATE
    );

INSERT INTO
    Groups (
        ID,
        Name,
        Description,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'group-2',
        'Management Group',
        'Executive and management level notifications',
        'system',
        SYSDATE
    );

INSERT INTO
    Groups (
        ID,
        Name,
        Description,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'group-3',
        'General Staff',
        'General staff communications and updates',
        'system',
        SYSDATE
    );

INSERT INTO
    Groups (
        ID,
        Name,
        Description,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'group-4',
        'Department A',
        'Department A specific notification group',
        'system',
        SYSDATE
    );

INSERT INTO
    Groups (
        ID,
        Name,
        Description,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'group-5',
        'Department B',
        'Department B specific notification group',
        'system',
        SYSDATE
    );

-- 6. Insert sample group members
INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-1',
        'group-1',
        'User One',
        'user1@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-2',
        'group-1',
        'User Two',
        'user2@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-3',
        'group-1',
        'User Three',
        'user3@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-4',
        'group-2',
        'Manager One',
        'manager1@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-5',
        'group-2',
        'Manager Two',
        'manager2@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-6',
        'group-3',
        'Staff Member A',
        'staff.a@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-7',
        'group-3',
        'Staff Member B',
        'staff.b@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-8',
        'group-4',
        'Department A Lead',
        'dept.a.lead@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-9',
        'group-4',
        'Department A Member',
        'dept.a.member@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-10',
        'group-5',
        'Department B Lead',
        'dept.b.lead@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-11',
        'group-5',
        'Department B Member',
        'dept.b.member@example.com',
        'system',
        SYSDATE
    );

INSERT INTO
    GroupMembers (
        ID,
        GroupID,
        Name,
        Email,
        CreatedBy,
        CreatedDate
    )
VALUES (
        'member-12',
        'group-5',
        'Department B Staff',
        'dept.b.staff@example.com',
        'system',
        SYSDATE
    );

-- 7. Commit the changes
COMMIT;