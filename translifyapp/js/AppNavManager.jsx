import {UI, FileInput, styleRule, registerStyle, styleRuleInherit, Button, Direction, Orientation, Level} from "UI";
import {NavManager} from "navmanager/NavManager";
import {NavStyle} from "navmanager/NavStyle";
import {BasicOrientedElement, NavAnchoredNotifications, NavElement, NavLinkElement, NavSection, navSessionManager}
    from "navmanager/NavElement";
import {LoginModal} from "LoginModal";
import {logout} from "Logout";
import {FAIcon} from "ui/FontAwesome";
import {NOOP_FUNCTION} from "Utils";

/*
 * This is the NavManager file of your app.
 *
 * Note that the whole app is a single page app.
 * Follow the instructions below in order to customize your application.
 */

class AppNavManagerStyle extends NavStyle {
    // Navbar
    @styleRuleInherit
    navManager = {
        backgroundColor: "",
        background: "#5824AA",
        boxShadow: "none",
    };

    dimensions = {
        collapseArrowWidth: "20px",
        navbarHeight: "76px",
        sidepanelElementHeight: "30px",
        sidepanelWidthLeft: "250px",
        sidepanelWidth: "330px",
        sidepanelHideWidth: "335px",
        sidepanelTransitionDuration: ".15s",
        boxShadowWidth: "5px",
        backgroundTransitionDuration: ".2s",
    };

    @styleRule
    anpr = {
        color: "white",
        fontWeight: "bold",
        paddingLeft: "31px",
        fontSize: "33px",
    };

    @styleRule
    contribute = {
        color: "white",
        fontWeight: "bold",
        fontSize: "23px",
        opacity: .57,
        background: "transparent !important",
        ">*:hover": {
            background: "rgba(255,255,255,.3) !important",
        }
    };
}


@registerStyle(AppNavManagerStyle)
class AppNavManager extends NavManager {
    leftSidePanel = null;
    rightSidePanel = null;

    getLeftFixed() {
        return [
            <NavSection anchor={Direction.LEFT} style={{margin: 0}}>
                <div className={this.styleSheet.anpr}>ANPR</div>
            </NavSection>
        ];
    }

    getRightFixed() {
        return [
            <NavSection anchor={Direction.RIGHT} style={{margin: 0}}>
                <NavLinkElement href="https://github.com/dbribe/translify" newTab className={this.styleSheet.contribute} value="contribute on Github" />
            </NavSection>
        ];
    }
}


export {AppNavManager};