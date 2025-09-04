-- 1. Drop tables if they exist
DECLARE
  table_exists NUMBER;
BEGIN
  -- Drop DistributionListMembers first (has foreign keys)
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'DISTRIBUTIONLISTMEMBERS';
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE DistributionListMembers';
  END IF;
  
  -- Drop DistributionLists
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'DISTRIBUTIONLISTS';
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE DistributionLists';
  END IF;
  
  -- Drop EmailTemplates
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'EMAILTEMPLATES';
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE EmailTemplates';
  END IF;
  
  -- Drop TemplateVariables (if exists from previous runs)
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'TEMPLATEVARIABLES';
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE TemplateVariables';
  END IF;
END;
/

-- 2. Create EmailTemplates table
CREATE TABLE EmailTemplates (
    ID VARCHAR2(50) PRIMARY KEY,
    Title VARCHAR2(255) NOT NULL,
    Description VARCHAR2(1000),
    Content CLOB NOT NULL,
    CreatedBy VARCHAR2(100) NOT NULL,
    CreatedDate DATE DEFAULT SYSDATE,
    UpdatedBy VARCHAR2(100),
    UpdatedDate DATE,
    IsActive CHAR(1) DEFAULT 'Y' CHECK (IsActive IN ('Y', 'N'))
);

-- 3. Create DistributionLists table
CREATE TABLE DistributionLists (
    ID VARCHAR2(50) PRIMARY KEY,
    Title VARCHAR2(255) NOT NULL UNIQUE,
    Description VARCHAR2(1000),
    CreatedBy VARCHAR2(100) NOT NULL,
    CreatedDate DATE DEFAULT SYSDATE,
    UpdatedBy VARCHAR2(100),
    UpdatedDate DATE,
    IsActive CHAR(1) DEFAULT 'Y' CHECK (IsActive IN ('Y', 'N'))
);

-- 4. Create DistributionListMembers table
CREATE TABLE DistributionListMembers (
    ID VARCHAR2(50) PRIMARY KEY,
    DistributionListId VARCHAR2(50) NOT NULL,
    Email VARCHAR2(255) NOT NULL,
    CreatedBy VARCHAR2(100) NOT NULL,
    CreatedDate DATE DEFAULT SYSDATE,
    CONSTRAINT FK_DistListMembers_DistList FOREIGN KEY (DistributionListId) REFERENCES DistributionLists (ID) ON DELETE CASCADE,
    CONSTRAINT UK_DistListMembers_Email_List UNIQUE (DistributionListId, Email)
);

-- 5. Create indexes for performance
CREATE INDEX IX_EmailTemplates_CreatedBy ON EmailTemplates (CreatedBy);

CREATE INDEX IX_EmailTemplates_IsActive ON EmailTemplates (IsActive);

CREATE INDEX IX_DistLists_CreatedBy ON DistributionLists (CreatedBy);

CREATE INDEX IX_DistLists_IsActive ON DistributionLists (IsActive);

CREATE INDEX IX_DistListMembers_Email ON DistributionListMembers (Email);

CREATE INDEX IX_DistListMembers_ListId ON DistributionListMembers (DistributionListId);

-- 6. Insert test email templates
INSERT INTO
    EmailTemplates (
        ID,
        Title,
        Description,
        Content,
        CreatedBy
    )
VALUES (
        'waiver-approved',
        'Waiver Approved',
        'Notification sent when a waiver is approved',
        'Dear {userName},

Your waiver for {waiverType} has been approved. The waiver will expire on {expiryDate}.

Best regards,
Waiver Management Team',
        'system'
    );

INSERT INTO
    EmailTemplates (
        ID,
        Title,
        Description,
        Content,
        CreatedBy
    )
VALUES (
        'waiver-denied',
        'Waiver Denied',
        'Notification sent when a waiver is denied',
        'Dear {userName},

Your waiver for {waiverType} has been denied.

Best regards,
Waiver Management Team',
        'system'
    );

INSERT INTO
    EmailTemplates (
        ID,
        Title,
        Description,
        Content,
        CreatedBy
    )
VALUES (
        'faa-waiver',
        'FAA Waiver',
        'Notification for approval of airspace flight authorizations',
        'Dear {userName},

Your FAA waiver status has been updated.',
        'system'
    );

INSERT INTO
    EmailTemplates (
        ID,
        Title,
        Description,
        Content,
        CreatedBy
    )
VALUES (
        'tsa-notify',
        'TSA Notify',
        'TSA notification for waiver updates',
        'TSA Notification: Waiver update for {userName}',
        'system'
    );

INSERT INTO
    EmailTemplates (
        ID,
        Title,
        Description,
        Content,
        CreatedBy
    )
VALUES (
        'waiver-submission',
        'Waiver Submission',
        'Confirmation of waiver submission',
        'Dear {userName},

Your {waiverType} waiver has been submitted successfully.',
        'system'
    );

INSERT INTO
    EmailTemplates (
        ID,
        Title,
        Description,
        Content,
        CreatedBy
    )
VALUES (
        'terminated-waiver',
        'Terminated Waiver',
        'Notification for terminated waivers',
        'Dear {userName},

Your {waiverType} waiver has been terminated.',
        'system'
    );

INSERT INTO
    EmailTemplates (
        ID,
        Title,
        Description,
        Content,
        CreatedBy
    )
VALUES (
        'incomplete-waiver',
        'Incomplete Waiver',
        'Notification for incomplete waiver',
        'Dear {userName},

Your {waiverType} waiver is incomplete.',
        'system'
    );

-- 7. Insert initial test distribution lists
INSERT INTO
    DistributionLists (
        ID,
        Title,
        Description,
        CreatedBy
    )
VALUES (
        'flight-facility',
        'Flight Facility Email List',
        'Main distribution list for flight facility notifications',
        'system'
    );

INSERT INTO
    DistributionLists (
        ID,
        Title,
        Description,
        CreatedBy
    )
VALUES (
        'tsa-termination',
        'Termination by TSA Notification List',
        'Distribution list for TSA termination notifications',
        'system'
    );

INSERT INTO
    DistributionLists (
        ID,
        Title,
        Description,
        CreatedBy
    )
VALUES (
        'domestic-approval',
        'Domestic Approval Notification List',
        'Distribution list for domestic approval notifications',
        'system'
    );

INSERT INTO
    DistributionLists (
        ID,
        Title,
        Description,
        CreatedBy
    )
VALUES (
        'sporting-approval',
        'Sporting Approval Notification List',
        'Distribution list for sporting event approval notifications',
        'system'
    );

INSERT INTO
    DistributionLists (
        ID,
        Title,
        Description,
        CreatedBy
    )
VALUES (
        'international-ambulance',
        'International Ambulance Alerts List',
        'Distribution list for international ambulance alerts',
        'system'
    );

INSERT INTO
    DistributionLists (
        ID,
        Title,
        Description,
        CreatedBy
    )
VALUES (
        'dassp-approval',
        'DASSP Approval Notification List',
        'Distribution list for DASSP approval notifications',
        'system'
    );

-- 8. Insert some test distribution list members
INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'flight-1',
        'flight-facility',
        'aaaa@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'flight-2',
        'flight-facility',
        'bbbbb@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'flight-3',
        'flight-facility',
        'cccc@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'flight-4',
        'flight-facility',
        'ddddd@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'flight-5',
        'flight-facility',
        'eee@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'flight-6',
        'flight-facility',
        'ffff@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'tsa-1',
        'tsa-termination',
        'aaaa@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'tsa-2',
        'tsa-termination',
        'bbbbb@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'domestic-1',
        'domestic-approval',
        'aaaa@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'domestic-2',
        'domestic-approval',
        'bbbbb@mail.com',
        'system'
    );

INSERT INTO
    DistributionListMembers (
        ID,
        DistributionListId,
        Email,
        CreatedBy
    )
VALUES (
        'domestic-3',
        'domestic-approval',
        'cccc@mail.com',
        'system'
    );

COMMIT;