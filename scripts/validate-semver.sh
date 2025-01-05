#!/bin/bash

validate_semver() {
    local tag="$1"
    local semver_regex="^v?([0-9]+)\.([0-9]+)\.([0-9]+)(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$"
    
    if [[ ! "$tag" =~ $semver_regex ]]; then
        echo "🤬 Error: Tag '${tag}' does not follow SemVer format"
        echo "Valid formats include:"
        echo "- 1.2.3"
        echo "- v1.2.3"
        echo "- 1.2.3-alpha"
        echo "- 1.2.3-alpha.1"
        echo "- 1.2.3+build.123"
        return 1
    fi

    echo "💚 Tag '${tag}' is a valid SemVer"
    return 0
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    if [[ $# -eq 0 ]]; then
        echo "Usage: $0 <tag>"
        exit 1
    fi

    if ! validate_semver "$1"; then
        exit 1
    fi
fi