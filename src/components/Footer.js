import React from 'react';



class Footer extends React.Component {
    render() {
        const privacyKeyHandler = ev => {
            ev.preventDefault();
            window.category = undefined;
            this.props.onPrivacyTermsLoad('terms-privacy', { hits: { hits: [] } });
        }
        const serviceKeyHandler = ev => {
            ev.preventDefault();
            window.category = undefined;
            this.props.onPrivacyTermsLoad('terms-service', { hits: { hits: [] } });
        }
        return (
            <footer class="page-footer font-small blue">   
                <div class="footer-copyright text-center py-3">© 2020 Copyright:
                    <a href="https://mdbootstrap.com/"> WONIZZ</a>
                </div>
            </footer>
        );
    }
}

export default Footer;
