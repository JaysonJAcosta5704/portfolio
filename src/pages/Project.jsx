import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaCalendarAlt, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import projects from 'json/projects';

function Project() {
    const { project: projectName } = useParams();

    const project = projects[projectName];

    if (!project) {
        return (
            <div className="container py-5 text-center">
                <h2>Project not found</h2>
                <div>The project you're looking for doesn't exist or has been removed.</div>
                <Link to="/projects">
                    <button className="btn btn-primary">
                        <FaArrowLeft className="me-2" /> Back to Projects
                    </button>
                </Link>
            </div>
        );
    }

    const getProgressBarVariant = (percentage) => {
        if (percentage >= 80) return 'bg-success';
        if (percentage >= 60) return 'bg-info';
        if (percentage >= 40) return 'bg-primary';
        if (percentage >= 20) return 'bg-warning';
        return 'bg-danger';
    };

    const relatedProjects = Object.values(projects)
        .filter(p =>
            p.name !== project.name &&
            p.tags.some(tag => project.tags.includes(tag))
        )
        .slice(0, 3);

    return (
        <div className="container project-detail-container py-5">
            <div className="mb-4">
                <Link to="/projects" className="text-decoration-none">
                    <button className="btn btn-outline-primary mb-4">
                        <FaArrowLeft className="me-2" /> Back to Projects
                    </button>
                </Link>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    {/* Project Header */}
                    <div className="project-header mb-4">
                        <h1>{project.name}</h1>
                        <div className="d-flex align-items-center mb-3">
                            <span className={`badge ${project.status === 'Completed' ? 'bg-success' : 'bg-primary'} me-3`}>
                                {project.status || 'Completed'}
                            </span>
                            <span className="text-muted">
                                <FaCalendarAlt className="me-1" /> {project.date || "Ongoing"}
                            </span>
                        </div>
                        <div className="d-flex flex-wrap mb-4">
                            {project.tags.map((tag, index) => (
                                <span key={index} className="badge bg-primary bg-opacity-25 text-primary border border-primary me-2 mb-2">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Project Gallery */}
                    <div className="project-gallery mb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <img
                                    src={project.images?.[0] || "https://picsum.photos/400/200"}
                                    alt={project.name}
                                    className="img-fluid main-image mb-3 rounded shadow"
                                />
                            </div>
                        </div>
                        {project.images && project.images.length > 1 && (
                            <div className="row">
                                {project.images.slice(1).map((image, index) => (
                                    <div className="col-md-6" key={index}>
                                        <img
                                            src={image}
                                            alt={`${project.name} screenshot ${index + 2}`}
                                            className="img-fluid gallery-image mb-3 rounded shadow"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Project Description */}
                    <div className="project-description mb-5">
                        <h2 className="border-bottom border-primary pb-2 mb-4">Project Overview</h2>
                        <div>{project.fullDescription || project.description}</div>

                        {/* Problem-Solution Section (if available) */}
                        {project.problem && project.solution && (
                            <div className="problem-solution mt-4">
                                <h3>Problem</h3>
                                <div>{project.problem}</div>

                                <h3>Solution</h3>
                                <div>{project.solution}</div>
                            </div>
                        )}
                    </div>

                    {/* Features Section (if available) */}
                    {project.features && project.features.length > 0 && (
                        <div className="project-features mb-5">
                            <h2 className="border-bottom border-primary pb-2 mb-4">Key Features</h2>
                            <ul className="feature-list">
                                {project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Challenges and Learnings Section (if available) */}
                    {(project.challenges || project.learnings) && (
                        <div className="project-challenges mb-5">
                            <h2 className="border-bottom border-primary pb-2 mb-4">Challenges & Learnings</h2>
                            <div className="row">
                                {project.challenges && project.challenges.length > 0 && (
                                    <div className="col-md-6 mb-4">
                                        <div className="card h-100 bg-dark text-white">
                                            <div className="card-header bg-dark border-bottom border-secondary">
                                                <h5 className="mb-0">Challenges Faced</h5>
                                            </div>
                                            <div className="card-body">
                                                <ul>
                                                    {project.challenges.map((challenge, index) => (
                                                        <li key={index}>{challenge}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {project.learnings && project.learnings.length > 0 && (
                                    <div className="col-md-6 mb-4">
                                        <div className="card h-100 bg-dark text-white">
                                            <div className="card-header bg-dark border-bottom border-secondary">
                                                <h5 className="mb-0">Key Learnings</h5>
                                            </div>
                                            <div className="card-body">
                                                <ul>
                                                    {project.learnings.map((learning, index) => (
                                                        <li key={index}>{learning}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-lg-4">
                    <div className="sticky-sidebar">
                        {/* Project Links */}
                        <div className="card mb-4 bg-dark text-white">
                            <div className="card-header bg-dark border-bottom border-secondary">
                                <h5 className="mb-0">Project Links</h5>
                            </div>
                            <div className="card-body">
                                <div className="d-grid gap-2">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-light"
                                        >
                                            <FaGithub className="me-2" /> View on GitHub
                                        </a>
                                    )}

                                    {project.liveDemo && (
                                        <a
                                            href={project.liveDemo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                        >
                                            <FaExternalLinkAlt className="me-2" /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contributions Section (if available) */}
                        {project.contributions && project.contributions.length > 0 && (
                            <div className="card mb-4 bg-dark text-white">
                                <div className="card-header bg-dark border-bottom border-secondary">
                                    <h5 className="mb-0">My Contributions</h5>
                                </div>
                                <div className="card-body">
                                    {project.contributions.map((contribution, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>{contribution.name}</span>
                                                <span>{contribution.percentage}%</span>
                                            </div>
                                            <div className="progress bg-secondary">
                                                <div
                                                    className={`progress-bar ${getProgressBarVariant(contribution.percentage)}`}
                                                    role="progressbar"
                                                    style={{ width: `${contribution.percentage}%` }}
                                                    aria-valuenow={contribution.percentage}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Future Improvements Section (if available) */}
                        {project.futureImprovements && project.futureImprovements.length > 0 && (
                            <div className="card mb-4 bg-dark text-white">
                                <div className="card-header bg-dark border-bottom border-secondary">
                                    <h5 className="mb-0">Future Improvements</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="future-list">
                                        {project.futureImprovements.map((improvement, index) => (
                                            <li key={index}>{improvement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div className="card mb-4 bg-dark text-white">
                            <div className="card-header bg-dark border-bottom border-secondary">
                                <h5 className="mb-0">Tech Stack</h5>
                            </div>
                            <div className="card-body">
                                <div className="d-flex flex-wrap">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="badge bg-secondary me-2 mb-2 p-2">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Projects Section */}
            {relatedProjects.length > 0 && (
                <div className="related-projects mt-5">
                    <h2 className="border-bottom border-primary pb-2 mb-4">You might also like</h2>
                    <div className="row">
                        {relatedProjects.map((relatedProject, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <Link to={`/projects/${relatedProject.name}`} className="text-decoration-none">
                                    <div className="card h-100 bg-dark text-white project-card">
                                        <img
                                            src={relatedProject.images?.[0] || "https://picsum.photos/400/200"}
                                            className="card-img-top project-image-sm"
                                            alt={relatedProject.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{relatedProject.name}</h5>
                                            <div className="card-text project-description">{relatedProject.shortDescription || relatedProject.description}</div>
                                            <div className="mt-3">
                                                <button className="btn btn-outline-light w-100">View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Project;