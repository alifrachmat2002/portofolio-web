export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
                <p>
                    © {new Date().getFullYear()} Alif Rachmat Illahi. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}