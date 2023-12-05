CREATE DATABASE [MediConnect]
GO
USE [MediConnect]
GO
/****** Object:  Table [dbo].[DonorData]    Script Date: 15-09-2023 08:00:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DonorData](
	[DonorID] [int] IDENTITY(1,1) NOT NULL,
	[Organs] [nvarchar](350) NULL,
	[MedInfo] [nvarchar](350) NULL,
	[Name] [nvarchar](50) NULL,
	[Relationship] [nvarchar](50) NULL,
	[Contact] [nvarchar](50) NULL,
	[Address] [nvarchar](150) NULL,
	[Sign] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_DonorData] PRIMARY KEY CLUSTERED 
(
	[DonorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RecipientData]    Script Date: 15-09-2023 08:00:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RecipientData](
	[RecipientID] [int] IDENTITY(1,1) NOT NULL,
	[OrgansInfo] [nvarchar](150) NULL,
	[BloodType] [nvarchar](50) NULL,
	[Age] [int] NULL,
	[Name] [nvarchar](50) NULL,
	[Relationship] [nvarchar](50) NULL,
	[Contact] [nvarchar](50) NULL,
	[Address] [nvarchar](150) NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_RecipientData] PRIMARY KEY CLUSTERED 
(
	[RecipientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRegistration]    Script Date: 15-09-2023 08:00:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRegistration](
	[RegID] [int] IDENTITY(1,1) NOT NULL,
	[Role] [int] NOT NULL,
	[Firstname] [nvarchar](150) NULL,
	[Lastname] [nvarchar](150) NULL,
	[Gender] [char](2) NULL,
	[DOB] [date] NULL,
	[BloodGroup] [nvarchar](5) NULL,
	[Email] [nvarchar](150) NULL,
	[Address] [nvarchar](250) NULL,
	[City] [nvarchar](50) NULL,
	[State] [nvarchar](50) NULL,
	[Zipcode] [nvarchar](50) NULL,
	[Username] [nvarchar](150) NULL,
	[Password] [nvarchar](100) NULL,
	[ConfirmPassword] [nvarchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	CONSTRAINT [PK_UserRegistration] PRIMARY KEY CLUSTERED 
	(
	[RegID] ASC
)
) ON [PRIMARY]
GO

USE [MediConnect]
GO
/****** Object:  Table [dbo].[UserRegistration]    Insert admin User ******/

INSERT INTO [dbo].[UserRegistration]
           ([Firstname]
           ,[Role]
           ,[Lastname]
           ,[Gender]
           ,[DOB]
           ,[BloodGroup]
           ,[Email]
           ,[Address]
           ,[City]
           ,[State]
           ,[Zipcode]
           ,[Username]
           ,[Password]
           ,[ConfirmPassword]
           ,[CreatedDate])
     VALUES
           ('Admin'
           ,1
           ,'Admin'
           ,'M'
           ,'2023-07-10 03:43:03.000'
           ,'AB+'
           ,'admin@yopmail.com'
           ,'Address'
           ,'City'
           ,'State'
           ,'Zipcode'
           ,'Username'
           ,'Password'
           ,'ConfirmPassword'
           ,'2023-07-10 03:43:03.000')
GO




/****** Object:  Table [dbo].[Feedback]    Script Date: 15-09-2023 08:00:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Ratings] [int] NOT NULL,
	[Feedback] [nvarchar](250) NULL,
	[CreatedDate] [datetime] NOT NULL,
	CONSTRAINT [PK_Feedback] PRIMARY KEY CLUSTERED 
	(
	[Id] ASC
)
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Contact]    Script Date: 15-09-2023 08:00:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contact](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Email] [nvarchar](250) NULL,
	[Name] [nvarchar](250) NULL,
	[Message] [nvarchar](250) NULL,
	[CreatedDate] [datetime] NOT NULL,
	CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
	(
	[Id] ASC
)
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Hospital]    Script Date: 15-09-2023 08:00:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Hospital](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) Not NULL,
	[Address] [nvarchar](500) Not NULL,
	[GoogleMapLink] NVARCHAR(MAX) Not NULL,
	[DistanceInKm] [int] Not NULL,
	[CreatedDate] [datetime] NOT NULL,
	CONSTRAINT [PK_Hospital] PRIMARY KEY CLUSTERED 
	(
	[Id] ASC
)
) ON [PRIMARY]
GO
/**** Seeding to Table [dbo].[Hospital] *****/
Insert INTO [dbo].[Hospital](Name, Address, GoogleMapLink, DistanceInKm, CreatedDate) 
VALUES ('Sunshine Hospitality', 'Begumpet, 1-11-254/11, Begumpet Rd, Prakash Nagar, Begumpet, Hyderabad, Telangana 500016', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.308516679963!2d78.46689957394496!3d17.444941601146983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90a3fdf23acf%3A0x721ef63f40910d1a!2sSunshine%20Hospitality!5e0!3m2!1sen!2sin!4v1694523990288!5m2!1sen!2sin" width="300" height="350" style="border: 0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade', 2, '2023-04-11 19:03:57.000')
Insert INTO [dbo].[Hospital](Name, Address, GoogleMapLink, DistanceInKm, CreatedDate) 
VALUES ('KIMS Hospitality', 'Begumpet, 1-8-31/1, Minister Rd, Krishna Nagar, Ramgopalpet, Secunderabad, Hyderabad, Telangana 500003', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.483184890202!2d78.47997587394477!3d17.43657270138876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a044ce8779d%3A0xe3d099b2316a1d2b!2sKIMS%20Hospitals!5e0!3m2!1sen!2sin!4v1694524635358!5m2!1sen!2sin" width="300" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade', 2.5, '2023-04-11 19:03:57.000')
Insert INTO [dbo].[Hospital](Name, Address, GoogleMapLink, DistanceInKm, CreatedDate) 
VALUES ('Apollo Hospitality', 'Apollo health City Campus, Road No.92, Jubilee Hills, Film Nagar, Hyderabad, Telangana 500090', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9322645710176!2d78.40964007394415!3d17.41503800201039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96cedf4c3327%3A0x41edbf89d86ce2c8!2sApollo%20Institute%20of%20Medical%20Sciences%20and%20Research!5e0!3m2!1sen!2sin!4v1694524714958!5m2!1sen!2sin" width="300" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade', 3, '2023-04-11 19:03:57.000')


/****** Object:  Table [dbo].[Organ]    Script Date: 15-09-2023 08:00:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organ](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) Not NULL,
	[CreatedDate] [datetime] NOT NULL,
	CONSTRAINT [PK_Organ] PRIMARY KEY CLUSTERED 
	(
	[Id] ASC
)
) ON [PRIMARY]
GO

Insert INTO [dbo].[Organ](Name, CreatedDate) VALUES ('Heart', '2023-04-11 19:03:57.000')
Insert INTO [dbo].[Organ](Name, CreatedDate) VALUES ('Lungs', '2023-04-11 19:03:57.000')
Insert INTO [dbo].[Organ](Name, CreatedDate) VALUES ('Liver', '2023-04-11 19:03:57.000')
Insert INTO [dbo].[Organ](Name, CreatedDate) VALUES ('Kidneys', '2023-04-11 19:03:57.000')


/****** Object:  Table [dbo].[Organ]    Script Date: 15-09-2023 08:00:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MedicalInfo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) Not NULL,
	[CreatedDate] [datetime] NOT NULL,
	CONSTRAINT [PK_MedicalInfo] PRIMARY KEY CLUSTERED 
	(
	[Id] ASC
)
) ON [PRIMARY]
GO

Insert INTO [dbo].[MedicalInfo](Name, CreatedDate) VALUES ('HIV/AIDS', '2023-04-11 19:03:57.000')
Insert INTO [dbo].[MedicalInfo](Name, CreatedDate) VALUES ('Hepatitis B or C', '2023-04-11 19:03:57.000')
Insert INTO [dbo].[MedicalInfo](Name, CreatedDate) VALUES ('Cancer', '2023-04-11 19:03:57.000')
Insert INTO [dbo].[MedicalInfo](Name, CreatedDate) VALUES ('Diabetes', '2023-04-11 19:03:57.000')

CREATE TABLE [dbo].[UserOrganMap] (
    [Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] INT NOT NULL,
    [OrganId] INT NOT NULL,
    [DonorId] INT NOT NULL,
	[IsDonated] BIT NOT NULL,
	[Details] NVARCHAR(MAX) NULL
	
    FOREIGN KEY ([UserId]) REFERENCES UserRegistration(RegID),
    FOREIGN KEY ([OrganId]) REFERENCES Organ(Id),
    FOREIGN KEY ([DonorId]) REFERENCES DonorData(DonorID),
CONSTRAINT [PK_UserOrganMap] PRIMARY KEY CLUSTERED 
	(
	[Id] ASC
)
) ON [PRIMARY]

CREATE TABLE [dbo].[UserMedicalMap] (
    [Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] INT NOT NULL,
    [MedId] INT NOT NULL,
	[DonorId] INT NOT NULL,

	FOREIGN KEY ([DonorId]) REFERENCES DonorData(DonorID),
    FOREIGN KEY ([UserId]) REFERENCES UserRegistration(RegID),
    FOREIGN KEY ([MedId]) REFERENCES MedicalInfo(Id),
CONSTRAINT [PK_UserMedicalMap] PRIMARY KEY CLUSTERED 
	(
	[Id] ASC
)
) ON [PRIMARY]

CREATE TABLE [dbo].[UserOrganReceiverMap] (
    [Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] INT NOT NULL,
    [OrganId] INT NOT NULL,
    [RecipientId] INT NOT NULL,
	[IsReceived] BIT NOT NULL,
	[Details] NVARCHAR(MAX) NULL

    FOREIGN KEY ([UserId]) REFERENCES UserRegistration(RegID),
    FOREIGN KEY ([OrganId]) REFERENCES Organ(Id),
    FOREIGN KEY ([RecipientId]) REFERENCES RecipientData(RecipientID),
CONSTRAINT [PK_UserOrganReceiverMap] PRIMARY KEY CLUSTERED 
	(
	[Id] ASC
)
) ON [PRIMARY]