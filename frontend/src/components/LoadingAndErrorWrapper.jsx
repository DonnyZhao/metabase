/* eslint "react/prop-types": "warn" */
import React, { Component, PropTypes } from "react";

import LoadingSpinner from "metabase/components/LoadingSpinner.jsx";

import cx from "classnames";

export default class LoadingAndErrorWrapper extends Component {
    static propTypes = {
        className:      PropTypes.string,
        error:          PropTypes.any,
        loading:        PropTypes.any,
        noBackground:   PropTypes.bool,
        noWrapper:      PropTypes.bool,
    };

    static defaultProps = {
        className:      "flex flex-full",
        error:          false,
        loading:        false,
        noBackground:   false,
        noWrapper:      false,
    };

    getErrorMessage() {
        const { error } = this.props;
        return (
            error.data ||
            error.statusText ||
            error.message ||
            "An error occured"
        );
    }

    getChildren() {
        function resolveChild(child) {
            if (Array.isArray(child)) {
                return child.map(resolveChild);
            } else if (typeof child === "function") {
                return child();
            } else {
                return child;
            }
        }
        return resolveChild(this.props.children);
    }

    render() {
        let { className, loading, error, noBackground, noWrapper } = this.props;
        let contentClassName = cx("wrapper py4 text-brand text-centered flex-full flex flex-column layout-centered", {
            "bg-white": !this.props.noBackground
        });
        if (noWrapper && !error && !loading) {
            return React.Children.only(this.getChildren());
        }
        return (
            <div {...this.props}>
                { error ?
                    <div className={contentClassName}>
                        <h2 className="text-normal text-grey-2">{this.getErrorMessage()}</h2>
                    </div>
                : loading ?
                    <div className={contentClassName}>
                        <LoadingSpinner />
                        <h2 className="text-normal text-grey-2 mt1">Loading...</h2>
                     </div>
                :
                    this.getChildren()
                }
            </div>
        );
    }
}
