export default function Footer() {
    const year = new Date().getFullYear();
    
    return (
        <footer className="footer">
            <p className="footer__text">&copy; {year} Interval learning</p>
        </footer>
        );
    };