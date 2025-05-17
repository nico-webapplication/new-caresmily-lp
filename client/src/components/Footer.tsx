const Footer = () => {
  return (
    <footer className="py-8 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="size-6 rounded-full border-2 border-primary border-r-transparent"></div>
            <span className="font-semibold">React Tech Demo</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Documentation
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
