-- ENUMs
CREATE TYPE user_role AS ENUM ('trainee', 'trainer', 'admin');
CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE file_type AS ENUM ('video', 'ppt', 'doc', 'other');
CREATE TYPE notification_type AS ENUM ('announcement', 'achievement', 'content');

-- 1. users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    status user_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. trainee_profiles
CREATE TABLE trainee_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    qualifications TEXT,
    experience TEXT,
    interests TEXT,
    skills JSONB DEFAULT '[]',
    certificates JSONB DEFAULT '[]'
);

-- 3. trainer_profiles
CREATE TABLE trainer_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    subject_expertise JSONB DEFAULT '[]',
    bio TEXT,
    rating DECIMAL(3, 2) DEFAULT 0.0
);

-- 4. courses
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    trainer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    deadline TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. enrollments
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    trainee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INTEGER DEFAULT 0,
    completion_status VARCHAR(50) DEFAULT 'in_progress',
    UNIQUE (trainee_id, course_id)
);

-- 6. assessments
CREATE TABLE assessments (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    subject VARCHAR(255),
    questions JSONB NOT NULL DEFAULT '[]',
    deadline TIMESTAMP,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. assessment_attempts
CREATE TABLE assessment_attempts (
    id SERIAL PRIMARY KEY,
    trainee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assessment_id INTEGER REFERENCES assessments(id) ON DELETE CASCADE,
    score DECIMAL(5, 2),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. library_resources
CREATE TABLE library_resources (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    file_type file_type NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    title VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. feedback
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    trainee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. competency_map
CREATE TABLE competency_map (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subject_tag VARCHAR(255) NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type notification_type NOT NULL,
    published_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. certificates
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    trainee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_url VARCHAR(500) NOT NULL
);
