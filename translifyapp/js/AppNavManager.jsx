import {UI, FileInput, Button, Direction, Orientation, Level} from "UI";
import {NavManager} from "navmanager/NavManager";
import {BasicOrientedElement, NavAnchoredNotifications, NavElement, NavLinkElement, NavSection, navSessionManager}
    from "navmanager/NavElement";
import {LoginModal} from "LoginModal";
import {logout} from "Logout";
import {FAIcon} from "ui/FontAwesome";
import {NOOP_FUNCTION} from "Utils";
import {UploadFilesModal} from "./Storage";

/*
 * This is the NavManager file of your app.
 *
 * Note that the whole app is a single page app.
 * Follow the instructions below in order to customize your application.
 */

class AppNavManager extends NavManager {
    leftSidePanel = null;
    rightSidePanel = null;

    getLeftFixed() {
        return [
            <NavSection anchor={Direction.LEFT} style={{margin: 0}}>
                <NavLinkElement value="Home" href="/" />
                <Button label="Upload image" onClick={() => UploadFilesModal.show()} />
            </NavSection>
        ];
    }

    getUserElement() {
            return <NavElement value={[<FAIcon icon="user" style={{marginRight: "0.3rem"}} />, USER.email]}>
                <NavElement value={UI.T("Settings")} />
                <NavElement value={UI.T("Logout")} onClick={() => logout()}/>
            </NavElement>;
    }

    getRightFixed() {
        return [
            <NavSection anchor={Direction.RIGHT} style={{margin: 0}}>
                {this.getUserElement()}
            </NavSection>
        ];
    }
}


export {AppNavManager};