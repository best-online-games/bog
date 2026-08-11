#!/usr/bin/env node
"use strict";
function require( path ){ return $node[ path ] };

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = self;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_attach(id, text) {
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        const elid = `$mol_style_attach:${id}`;
        let el = doc.getElementById(elid);
        if (!el) {
            el = doc.createElement('style');
            el.id = elid;
            doc.head.appendChild(el);
        }
        if (el.innerHTML != text)
            el.innerHTML = text;
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise extends Promise {
        done;
        fail;
        constructor(executor) {
            let done;
            let fail;
            super((d, f) => {
                done = d;
                fail = f;
                executor?.(d, f);
            });
            this.done = done;
            this.fail = fail;
        }
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS Units
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    /**
     * CSS Functions
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static linear_gradient(value) {
            return new $mol_style_func('linear-gradient', value);
        }
        static radial_gradient(value) {
            return new $mol_style_func('radial-gradient', value);
        }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Create record of CSS variables. */
    function $mol_style_prop(prefix, keys) {
        const record = keys.reduce((rec, key) => {
            rec[key] = $mol_style_func.vary(`--${prefix}_${key}`);
            return rec;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
        'hue',
        'hue_spread',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\nbody, :where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
"use strict";
// namespace $ {
// 	$mol_style_attach( '$mol_theme_lights', `:root { --mol_theme_back: oklch( ${ $$.$mol_lights() ? 92 : 20 }% .01 var(--mol_theme_hue) ) }` )
// }

;
"use strict";
var $;
(function ($) {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'page',
        'block',
        'text',
        'emoji',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_emoji: .5rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    /**
     * JSX adapter that makes DOM tree.
     * Generates global unique ids for every DOM-element by components tree with ids.
     * Ensures all local ids are unique.
     * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
     */
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        static [$mol_key_handle]() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        [Symbol.dispose]() {
            this.destructor();
        }
        //[ Symbol.toPrimitive ]( hint: string ) {
        //	return hint === 'number' ? this.valueOf() : this.toString()
        //}
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Generates unique identifier. */
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Special status statuses. */
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        /** Update required. */
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        /** Some of (transitive) pub update required. */
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        /** Actual state but may be dropped. */
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        /** State will never be changed. */
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
        data = [];
        // Derived objects should be Arrays.
        static get [Symbol.species]() {
            return Array;
        }
        /**
         * Index of first subscriber.
         */
        sub_from = 0; // 4B
        /**
         * All current subscribers.
         */
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        /**
         * Has any subscribers or not.
         */
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        /**
         * Called when last sub was unsubscribed.
         **/
        reap() { }
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh() { }
        /**
         * Allow to put data to caches in the subtree.
         */
        complete() { }
        get incompleted() {
            return false;
        }
        /**
         * Notify subscribers about self changes.
         */
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant, this.data[i + 1]);
            }
        }
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            // if( Error.isError( val ) ) true
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            // if( Error.isError( val ) ) {
            // 	return $mol_dev_format_native( val )
            // }
            return null;
        },
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        // if( ![ 'object', 'function', 'symbol' ].includes( typeof obj )  ) return obj
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
    class Stack extends Array {
        // [ Symbol.toPrimitive ]() {
        // 	return this.toString()
        // }
        match(...args) {
            return this.toString().match(...args);
        }
        split(...args) {
            return this.toString().split(...args);
        }
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            // const func = c.getFunction()
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0; // 4B
        cursor = $mol_wire_cursor.stale; // 4B
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
            // if( pos >= 0 && pos < this.sub_from - 2 ) {
            // 	const pub = this.data[ pos ] as $mol_wire_pub
            // 	if( pub instanceof $mol_wire_task ) return
            // 	for(
            // 		let cursor = this.pub_from;
            // 		cursor < this.sub_from;
            // 		cursor += 2
            // 	) {
            // 		const pub = this.data[ cursor ] as $mol_wire_pub
            // 		if( pub instanceof $mol_wire_task ) {
            // 			pub.destructor()
            // 		}
            // 	}
            // }
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            // Sync whole fiber graph
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            // Collect garbage
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    // never ends on destructed fiber
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    /** Returns string key for any value. */
    function $mol_key(value) {
        primitives: {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return `Symbol(${value.description})`;
            if (!value)
                return JSON.stringify(value); // 0, null, ""
            if (typeof value !== 'object' && typeof value !== 'function')
                return JSON.stringify(value); // boolean, number, string
        }
        caching: {
            let key = $mol_key_store.get(value);
            if (key)
                return key;
        }
        objects: {
            if (value instanceof TypedArray) {
                return `${value[Symbol.toStringTag]}([${[...value].map(v => $mol_key(v))}])`;
            }
            if (Array.isArray(value))
                return `[${value.map(v => $mol_key(v))}]`;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Date)
                return `Date(${value.valueOf()})`;
        }
        structures: {
            const proto = Reflect.getPrototypeOf(value);
            if (!proto || !Reflect.getPrototypeOf(proto)) {
                return `{${Object.entries(value).map(([k, v]) => JSON.stringify(k) + ':' + $mol_key(v))}}`;
            }
        }
        handlers: {
            if ($mol_key_handle in value) {
                return value[$mol_key_handle]();
            }
        }
        containers: {
            const key = JSON.stringify('#' + $mol_guid());
            $mol_key_store.set(value, key);
            return key;
        }
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_object2 {
        task;
        static _promise = null;
        static get promise() {
            if (this._promise)
                return this._promise;
            return this._promise = new Promise(done => {
                const complete = () => {
                    this._promise = null;
                    done();
                };
                if (typeof requestAnimationFrame === 'function') {
                    requestAnimationFrame(complete);
                }
                else {
                    setTimeout(complete, 16);
                }
            });
        }
        cancelled = false;
        promise;
        constructor(task) {
            super();
            this.task = task;
            this.promise = $mol_after_frame.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(event) {
        const self = this.$;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_log3_web_make(level, color) {
        return function $mol_log3_logger(event) {
            const pending = this.$mol_log3_stack.pop();
            if (pending)
                pending();
            let tpl = '%c';
            const chunks = Object.entries(event);
            for (let i = 0; i < chunks.length; ++i) {
                tpl += (typeof chunks[i][1] === 'string') ? '%s: %s\n' : '%s: %o\n';
            }
            const style = `color:${color};font-weight:bolder`;
            this.console[level](tpl.trim(), style, ...[].concat(...chunks));
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_web_make = $mol_log3_web_make;
    $.$mol_log3_come = $mol_log3_web_make('info', 'royalblue');
    $.$mol_log3_done = $mol_log3_web_make('info', 'forestgreen');
    $.$mol_log3_fail = $mol_log3_web_make('error', 'orangered');
    $.$mol_log3_warn = $mol_log3_web_make('warn', 'goldenrod');
    $.$mol_log3_rise = $mol_log3_web_make('log', 'magenta');
    $.$mol_log3_area = $mol_log3_web_make('group', 'cyan');
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** One-shot fiber */
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                // Disabled because non-idempotency is required for try-catch
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let error;
    let result;
    let handler;
    /// Debugger will stop at exceptions but exception will be returned normally
    function $mol_try_web(handler2) {
        handler = handler2;
        error = undefined;
        result = undefined;
        self.dispatchEvent(new Event('$mol_try'));
        const error2 = error;
        const result2 = result;
        error = undefined;
        result = undefined;
        return error2 || result2;
    }
    $.$mol_try_web = $mol_try_web;
    $.$mol_try = $mol_try_web;
    self.addEventListener('$mol_try', (event) => {
        result = handler();
    }, true);
    self.addEventListener('error', (event) => {
        error = event.error;
    }, true);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Long-living fiber. */
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        /**
         * Update atom value through another temp fiber.
         */
        resync(args) {
            // enforce pulling tasks abort
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                const key = $mol_key(this.args[0]);
                const map = (this.host ?? this.task)[this.field()];
                if (!map.has(key))
                    this.$.$mol_log3_warn({
                        place: this,
                        message: 'Absent key on destruction',
                        hint: 'Check for $mol_key(key) is not changed',
                    });
                map.delete(key);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem = $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            this.resizes();
            return {
                width: self.innerWidth,
                height: self.innerHeight,
            };
        }
        static resizes(next) { return next; }
    }
    __decorate([
        $mol_mem
    ], $mol_window, "size", null);
    __decorate([
        $mol_mem
    ], $mol_window, "resizes", null);
    $.$mol_window = $mol_window;
    self.addEventListener('resize', event => $mol_window.resizes(event));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element?.shadowRoot) {
                element = element.shadowRoot.activeElement;
            }
            while (element) {
                parents.push(element);
                const parent = element.parentNode;
                if (parent instanceof ShadowRoot)
                    element = parent.host;
                else
                    element = parent;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
    * Key names code for hotkey
    * @see [mol_hotkey](../../hotkey/hotkey.view.ts)
    */
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if ($mol_dom_context.document) {
        function focus(event) {
            const target = event.target;
            if (target?.shadowRoot)
                watch(target.shadowRoot);
            $mol_view_selection.focused($mol_maybe(target), 'notify');
        }
        function watch(root) {
            root.removeEventListener('focus', focus, true);
            root.addEventListener('focus', focus, true);
        }
        watch($mol_dom_context.document);
        $mol_dom.document.addEventListener('keydown', event => {
            if (!event.altKey)
                return;
            const self = $mol_view_selection.focused()[0];
            if (!self)
                return;
            switch (event.keyCode) {
                case $mol_keyboard_code.down:
                    var vert = 1, hor = 0;
                    break;
                case $mol_keyboard_code.up:
                    var vert = -1, hor = 0;
                    break;
                case $mol_keyboard_code.left:
                    var hor = -1, vert = 0;
                    break;
                case $mol_keyboard_code.right:
                    var hor = 1, vert = 0;
                    break;
                default: return;
            }
            event.preventDefault();
            const self_rect = self.getBoundingClientRect();
            const center_hor = (self_rect.left + self_rect.right) / 2;
            const center_vert = (self_rect.top + self_rect.bottom) / 2;
            const all = [...$mol_dom.document.querySelectorAll(':where( [role="button"], [role="checkbox"], input, button, a ):not([disabled])')]
                .map(el => {
                const rect = el.getBoundingClientRect();
                const dist = (Math.max(0, center_hor - rect.right) + Math.max(0, rect.left - center_hor)) * vert * vert
                    + (Math.max(0, center_vert - rect.bottom) + Math.max(0, rect.top - center_vert)) * hor * hor;
                return [el, rect, dist];
            })
                .filter(([el, rect]) => {
                if (el === self)
                    return false;
                if (vert > 0 && rect.top < self_rect.bottom)
                    return false;
                if (vert < 0 && rect.bottom > self_rect.top)
                    return false;
                if (hor > 0 && rect.left < self_rect.right)
                    return false;
                if (hor < 0 && rect.right > self_rect.left)
                    return false;
                return true;
            })
                .sort(([, one, dist1], [, two, dist2]) => {
                return (dist1 - dist2) || ((one.top - two.top) * vert + (one.left - two.left) * hor);
            });
            const target = all[0]?.[0];
            target?.focus();
        });
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this ?? fun))
                    return store.get(this ?? fun);
                const val = task.call(this, next) ?? next;
                store.set(this ?? fun, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Run code without state changes */
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Real-time refresh current atom.
     * Don't use if possible. May reduce performance.
     */
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            else if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (val === el[key])
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "@view-transition {\n\tnavigation: auto;\n}\n\n[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n\ttext-wrap-style: pretty;\n}\t\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\t/*overscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    /**
     * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
     * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
     */
    /// Reactive statefull lazy ViewModel
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        static roots() {
            return [...$mol_dom.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])')].map((node, index) => {
                const name = node.getAttribute('mol_view_root');
                const View = this.$[name];
                if (!View) {
                    $mol_fail_log(new Error(`Autobind unknown view class`, { cause: { name } }));
                    return null;
                }
                const view = View.Root(index);
                view.dom_node(node);
                return view;
            }).filter($mol_guard_defined);
        }
        static auto() {
            const roots = this.roots();
            if (!roots.length)
                return;
            for (const root of roots) {
                try {
                    root.dom_tree();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }
            try {
                document.title = roots[0].title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            descr: try {
                const descr = roots[0].hint();
                if (!descr)
                    break descr;
                const head = $mol_dom.document.head;
                let node = head.querySelector('meta[name="description"]');
                if (node)
                    node.content = descr;
                else
                    head.append($mol_jsx("meta", { name: "description", content: descr }));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        hint() {
            return '';
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        /// Name of element that created when element not found in DOM
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        /// NameSpace of element that created when element not found in DOM
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        /// Raw child views
        sub() {
            return [];
        }
        /// Visible sub views with defined ambient context
        /// Render all by default
        sub_visible() {
            return this.sub();
        }
        /// Minimal width that used for lazy rendering
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        /// Minimal height that used for lazy rendering
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null; // don't touch DOM to prevent instant reflow
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom }; // pick to optimize compare
            }
        }
        dom_id() {
            return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'");
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error)
                    ? error.constructor[Symbol.toStringTag] ?? 'Promise'
                    : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                try {
                    ;
                    node.innerText = this.$.$mol_error_message(error).replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return [];
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        /** Deep search view by predicate. */
        *view_find(check, path = []) {
            if (path.length === 0 && check(this))
                return yield [this];
            try {
                const checked = new Set();
                const sub = this.sub();
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (!check(item))
                        continue;
                    checked.add(item);
                    yield [...path, this, item];
                }
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (checked.has(item))
                        continue;
                    yield* item.view_find(check, [...path, this]);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        /** Renders path of views to DOM. */
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        /** Renders view to DOM and scroll to it. */
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            finally {
                view.dom_node().scrollIntoView({ block: align });
            }
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            // new this.$.$mol_after_frame( ()=> {
            // 	this.dom_node().scrollIntoView({ block: 'start', inline: 'nearest' })
            // } )
            new this.$.$mol_after_timeout(0, () => {
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_id", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "roots", null);
    __decorate([
        $mol_mem
    ], $mol_view, "auto", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_dom_context.document?.addEventListener('DOMContentLoaded', () => $mol_view.auto(), { once: true });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));

;
	($.$mol_scroll) = class $mol_scroll extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		event_scroll(next){
			if(next !== undefined) return next;
			return null;
		}
		scroll_top(next){
			if(next !== undefined) return next;
			return 0;
		}
		scroll_left(next){
			if(next !== undefined) return next;
			return 0;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		event(){
			return {...(super.event()), "scroll": (next) => (this.event_scroll(next))};
		}
	};
	($mol_mem(($.$mol_scroll.prototype), "event_scroll"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_top"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_left"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix of Object.keys(val).reverse()) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type of Object.keys(types).reverse()) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name of Object.keys(attrs).reverse()) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media' || key === '@container') {
                    const media = config[key];
                    for (let query of Object.keys(media).reverse()) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else if (key === '@starting-style') {
                    const styles = config[key];
                    rules.push('}\n');
                    make_class(prefix, path, styles);
                    rules.push(`${key} {\n`);
                }
                else if (key[0] === '[' && key[key.length - 1] === ']') {
                    const attr = key.slice(1, -1);
                    const vals = config[key];
                    for (let val of Object.keys(vals).reverse()) {
                        make_class(selector(prefix, path) + ':where([' + attr + '=' + JSON.stringify(val) + '])', [], vals[val]);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS in TS.
     * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Scrolling pane.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
         */
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'grid',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
                // basis: 0,
            },
            outline: 'none',
            align: {
                self: 'stretch',
                items: 'flex-start',
            },
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    // transform: 'translateZ(0)', // enforce gpu scroll in all agents
                    gridArea: '1/1',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'hidden',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_book2) = class $mol_book2 extends ($.$mol_scroll) {
		pages_deep(){
			return [];
		}
		pages(){
			return (this.pages_deep());
		}
		Placeholder(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		placeholders(){
			return [(this.Placeholder())];
		}
		menu_title(){
			return "";
		}
		sub(){
			return [...(this.pages()), ...(this.placeholders())];
		}
		minimal_width(){
			return 0;
		}
		Gap(id){
			const obj = new this.$.$mol_view();
			(obj.title) = () => ("");
			return obj;
		}
	};
	($mol_mem(($.$mol_book2.prototype), "Placeholder"));
	($mol_mem_key(($.$mol_book2.prototype), "Gap"));


;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    $.$mol_layer = $mol_style_prop('mol_layer', [
        'hover',
        'focus',
        'speck',
        'float',
        'popup',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Root component for adaptivity to various screen sizes. Implements booklet UX.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_book2_demo
         */
        class $mol_book2 extends $.$mol_book2 {
            pages_deep() {
                let result = [];
                for (const subpage of this.pages()) {
                    if (subpage instanceof $mol_book2)
                        result = [...result, ...subpage.pages_deep()];
                    else
                        result.push(subpage);
                }
                return result;
            }
            title() {
                return this.pages_deep().map(page => {
                    try {
                        return page?.title();
                    }
                    catch (error) {
                        $mol_fail_log(error);
                    }
                }).reverse().filter(Boolean).join(' | ');
            }
            menu_title() {
                return this.pages_deep()[0]?.title() || this.title();
            }
            sub() {
                const placeholders = this.placeholders();
                const next = this.pages_deep().filter(Boolean);
                const prev = $mol_mem_cached(() => this.sub())?.filter(page => !placeholders.includes(page)) ?? [];
                for (let i = 1; i; ++i) {
                    const p = prev[prev.length - i];
                    const n = next[next.length - i];
                    if (!n)
                        break;
                    if (p === n)
                        continue;
                    new this.$.$mol_after_tick(() => {
                        const b = this.dom_node();
                        const p = n.dom_node();
                        b.scroll({
                            left: p.offsetLeft + p.offsetWidth - b.offsetWidth,
                            behavior: 'smooth',
                        });
                        // new this.$.$mol_after_timeout( 1000, ()=> n.bring() )
                    });
                    break;
                }
                return [...next, ...placeholders];
            }
            bring() {
                const pages = this.pages_deep();
                if (pages.length)
                    pages[pages.length - 1].bring();
                else
                    super.bring();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "pages_deep", null);
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "sub", null);
        $$.$mol_book2 = $mol_book2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/book2/book2.view.css", "[mol_book2] {\n\tdisplay: flex;\n\tflex-flow: row nowrap;\n\talign-items: stretch;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n\t/* transform: translateZ(0); */\n\ttransition: none;\n\tscroll-snap-type: x mandatory;\n\t/* padding: 0 1px;\n\tscroll-padding: 0 1px;\n\tgap: 1px; */\n}\n\n[mol_book2] > * {\n/* \tflex: none; */\n\tscroll-snap-stop: always;\n\tscroll-snap-align: end;\n\tposition: relative;\n\tmin-height: 100%;\n\tmax-height: 100%;\n\tmax-width: 100%;\n\tflex-shrink: 0;\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_field);\n}\n\n[mol_book2] > *:not(:first-of-type):before,\n[mol_book2] > *:not(:last-of-type)::after {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 1.5rem;\n\twidth: 3px;\n\theight: 1rem;\n\tbackground: linear-gradient(\n\t\tto bottom,\n\t\tvar(--mol_theme_special) 0%,\n\t\tvar(--mol_theme_special) 14%,\n\t\ttransparent 15%,\n\t\ttransparent 42%,\n\t\tvar(--mol_theme_special) 43%,\n\t\tvar(--mol_theme_special) 57%,\n\t\ttransparent 58%,\n\t\ttransparent 85%,\n\t\tvar(--mol_theme_special) 86%,\n\t\tvar(--mol_theme_special) 100%\n\t);\n\topacity: .5;\n\tz-index: var(--mol_layer_speck);\n}\n[mol_book2] > *:not(:first-of-type):before {\n\tleft: -3px;\n}\n[mol_book2] > *:not(:last-of-type)::after {\n\tright: -3px;\n}\n\n:where([mol_book2]) > * {\n\tbackground-color: var(--mol_theme_card);\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_back); */\n}\n\n[mol_book2] > [mol_book2] {\n\tdisplay: contents;\n}\n\n[mol_book2] > *:first-child {\n\tscroll-snap-align: start;\n}\n\n[mol_book2] > [mol_view] {\n\ttransform: none; /* prevent content clipping */\n}\n\n[mol_book2_placeholder] {\n\tflex: 1 1 0;\n\tbackground: none;\n}\n\n[mol_book2_gap] {\n\tbackground: none;\n\tflex-grow: 1;\n\tscroll-snap-align: none;\n\tmargin-right: -1px;\n\tbox-shadow: none;\n}\n\n[mol_book2_gap]::before,\n[mol_book2_gap]::after {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_theme_auto) = class $mol_theme_auto extends ($.$mol_plugin) {
		dark(){
			return "$mol_theme_dark";
		}
		theme(){
			return (this.dark());
		}
		light(){
			return "$mol_theme_light";
		}
		attr(){
			return {"mol_theme": (this.theme())};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** State of arguments like `#foo=bar/xxx` or `?foo=bar&xxx` */
    class $mol_state_arg extends $mol_object {
        prefix;
        static href(next) {
            if (next === undefined) {
                next = $mol_dom.location.href;
            }
            else if (!/^about:srcdoc/.test(next)) {
                new $mol_after_frame(() => {
                    const next = this.href();
                    const prev = $mol_dom.location.href;
                    if (next === prev)
                        return;
                    const history = $mol_dom.history;
                    history.replaceState(history.state, $mol_dom.document.title, next);
                });
            }
            if ($mol_dom.parent && ($mol_dom.parent !== $mol_dom.self)) {
                $mol_dom.parent.postMessage(['hashchange', next], '*');
            }
            return next;
        }
        static href_normal() {
            return this.link({});
        }
        static href_absolute() {
            return new URL(this.href(), $mol_dom.location.href).toString();
        }
        static dict(next) {
            var href = this.href(next && this.make_link(next)).split(/#!?/)[1] || '';
            var chunks = href.split(this.separator);
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static dict_cut(except) {
            const dict = this.dict();
            const cut = {};
            for (const key in dict) {
                if (except.indexOf(key) >= 0)
                    break;
                cut[key] = dict[key];
            }
            return cut;
        }
        static value(key, next) {
            const nextDict = (next === void 0) ? void 0 : { ...this.dict(), [key]: next };
            const next2 = this.dict(nextDict)[key];
            return (next2 == null) ? null : next2;
        }
        static link(next) {
            return this.make_link({
                ...this.dict_cut(Object.keys(next)),
                ...next,
            });
        }
        static prolog = '!';
        static separator = '/';
        static make_link(next) {
            const chunks = [];
            for (let key in next) {
                if (null == next[key])
                    continue;
                const val = next[key];
                chunks.push([key].concat(val ? [val] : []).map(this.encode).join('='));
            }
            return new URL('#' + this.prolog + chunks.join(this.separator), this.href_absolute()).toString();
        }
        static commit() {
            $mol_dom.history.pushState($mol_dom.history.state, $mol_dom.document.title, this.href());
        }
        static go(next) {
            $mol_dom.location.href = this.link(next);
        }
        static encode(str) {
            return encodeURIComponent(str).replace(/\(/g, '%28').replace(/\)/g, '%29');
        }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_absolute", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "dict_cut", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "make_link", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "commit", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
    function $mol_state_arg_change() {
        $mol_state_arg.href($mol_dom.location.href);
    }
    self.addEventListener('hashchange', $mol_state_arg_change);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_user_async() {
        return new Promise(done => $mol_dom.addEventListener('click', function onclick() {
            $mol_dom.removeEventListener('click', onclick);
            done(null);
        }));
    }
    $.$mol_wait_user_async = $mol_wait_user_async;
    function $mol_wait_user() {
        return this.$mol_wire_sync(this).$mol_wait_user_async();
    }
    $.$mol_wait_user = $mol_wait_user;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        static native() {
            return this.$.$mol_dom_context.navigator.storage ?? {
                persisted: async () => false,
                persist: async () => false,
                estimate: async () => ({}),
                getDirectory: async () => null,
            };
        }
        static persisted(next, cache) {
            $mol_mem_persist();
            if (cache)
                return Boolean(next);
            const native = this.native();
            if (next && !$mol_mem_cached(() => this.persisted())) {
                this.$.$mol_wait_user_async()
                    .then(() => native.persist())
                    .then(actual => {
                    setTimeout(() => this.persisted(actual, 'cache'), 5000);
                    if (actual)
                        this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` });
                    else
                        this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` });
                });
            }
            return next ?? $mol_wire_sync(native).persisted();
        }
        static estimate() {
            return $mol_wire_sync(this.native() ?? {}).estimate();
        }
        static dir() {
            return $mol_wire_sync(this.native()).getDirectory();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage, "persisted", null);
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    self.addEventListener('storage', event => $.$mol_state_local.changes(event));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function parse(theme) {
        if (theme === 'true')
            return true;
        if (theme === 'false')
            return false;
        return null;
    }
    /**
     * Switcher between light/dark themes (usually for `mol_theme_auto` plugin).
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
     */
    function $mol_lights(next) {
        const arg = parse(this.$mol_state_arg.value('mol_lights'));
        const base = this.$mol_media.match('(prefers-color-scheme: light)');
        if (next === undefined) {
            return arg ?? this.$mol_state_local.value('$mol_lights') ?? base;
        }
        else {
            if (arg === null) {
                this.$mol_state_local.value('$mol_lights', next === base ? null : next);
            }
            else {
                this.$mol_state_arg.value('mol_lights', String(next));
            }
            return next;
        }
    }
    $.$mol_lights = $mol_lights;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * The [plugin](../../plugin/readme.md) which defines theme based on [mol_lights](../../lights/readme.md).
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
         */
        class $mol_theme_auto extends $.$mol_theme_auto {
            theme() {
                return this.$.$mol_lights() ? this.light() : this.dark();
            }
        }
        $$.$mol_theme_auto = $mol_theme_auto;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_tooltip_plugin) = class $bog_tooltip_plugin extends ($.$mol_plugin) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        // Глобальный быстрый CSS-tooltip для любого $mol-компонента с `hint`/`title`.
        // Перехватываем mouseover на весь документ: переносим title -> data-mol-tip,
        // чтобы нативный tooltip с задержкой 700ms не показывался.
        if (typeof $mol_dom_context !== 'undefined' && $mol_dom_context.document) {
            const doc = $mol_dom_context.document;
            const move_title = (el) => {
                if (!el || el.nodeType !== 1)
                    return;
                // Поднимаемся вверх по дереву и переносим title с любого предка —
                // hover может прилететь от вложенного <input> / <svg>, а title-атрибут
                // часто стоит на корне кнопки.
                let node = el;
                while (node) {
                    const t = node.getAttribute && node.getAttribute('title');
                    if (t) {
                        node.setAttribute('data-mol-tip', t);
                        node.removeAttribute('title');
                    }
                    node = node.parentElement;
                }
            };
            doc.addEventListener('mouseover', (e) => move_title(e.target), true);
            doc.addEventListener('focusin', (e) => move_title(e.target), true);
        }
        $mol_style_attach('bog/tooltip/tooltip.view.css', `
		[data-mol-tip] {
			position: relative;
		}
		/* Только устройства с настоящим hover (десктоп с мышью).
		   На touch-девайсах синтетический hover после tap не снимается и tooltip залипает —
		   поэтому всё показывается ИСКЛЮЧИТЕЛЬНО внутри @media (hover: hover). */
		@media (hover: hover) and (pointer: fine) {
			[data-mol-tip]:hover::after {
				content: attr(data-mol-tip);
				position: absolute;
				z-index: 1000;
				top: calc(100% + 4px);
				left: 50%;
				transform: translateX(-50%);
				background: var(--mol_theme_card);
				color: var(--mol_theme_text);
				padding: 0.25rem 0.5rem;
				border-radius: 0.25rem;
				font-size: 0.75rem;
				line-height: 1.2;
				white-space: nowrap;
				max-width: min(80vw, 24rem);
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
				pointer-events: none;
				animation: bog-tooltip-in 0.08s ease-out;
			}
		}
		@keyframes bog-tooltip-in {
			from { opacity: 0; transform: translate(-50%, -2px); }
			to   { opacity: 1; transform: translate(-50%, 0); }
		}
	`);
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_ui_tooltip) = class $bog_ui_tooltip extends ($.$bog_tooltip_plugin) {};


;
"use strict";


;
	($.$mol_svg) = class $mol_svg extends ($.$mol_view) {
		dom_name(){
			return "svg";
		}
		dom_name_space(){
			return "http://www.w3.org/2000/svg";
		}
		font_size(){
			return 16;
		}
		font_family(){
			return "";
		}
		style_size(){
			return {};
		}
	};


;
"use strict";
var $;
(function ($) {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Base SVG component to display SVG images or icons. */
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		geometry(){
			return "";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
	};


;
"use strict";


;
	($.$mol_icon) = class $mol_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Path(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		view_box(){
			return "0 0 24 24";
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
		sub(){
			return [(this.Path())];
		}
	};
	($mol_mem(($.$mol_icon.prototype), "Path"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_view_grid) = class $mol_icon_view_grid extends ($.$mol_icon) {
		path(){
			return "M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3";
		}
	};


;
"use strict";


;
	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		value(){
			return null;
		}
		theme(){
			return "$mol_theme_accent";
		}
		sub(){
			return [(this.value())];
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button) = class $mol_button extends ($.$mol_view) {
		event_activate(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			return (this.event_activate(next));
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		event_key_press(next){
			if(next !== undefined) return next;
			return null;
		}
		key_press(next){
			return (this.event_key_press(next));
		}
		disabled(){
			return false;
		}
		tab_index(){
			return 0;
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		error(){
			return "";
		}
		enabled(){
			return true;
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		event(){
			return {
				...(super.event()), 
				"click": (next) => (this.activate(next)), 
				"dblclick": (next) => (this.clicks(next)), 
				"keydown": (next) => (this.key_press(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"disabled": (this.disabled()), 
				"role": "button", 
				"tabindex": (this.tab_index()), 
				"title": (this.hint_safe())
			};
		}
		sub(){
			return [(this.title())];
		}
		Speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.error()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button.prototype), "event_activate"));
	($mol_mem(($.$mol_button.prototype), "clicks"));
	($mol_mem(($.$mol_button.prototype), "event_key_press"));
	($mol_mem(($.$mol_button.prototype), "click"));
	($mol_mem(($.$mol_button.prototype), "event_click"));
	($mol_mem(($.$mol_button.prototype), "status"));
	($mol_mem(($.$mol_button.prototype), "Speck"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Simple button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    // Calling actions from catch section, if throwing promise breaks idempotency
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const error = this.status()?.[0];
                if (!error)
                    return '';
                if ($mol_promise_like(error)) {
                    return $mol_fail_hidden(error);
                }
                return this.$.$mol_error_message(error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_button_typed) = class $mol_button_typed extends ($.$mol_button) {
		minimal_height(){
			return 40;
		}
		minimal_width(){
			return 40;
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n\tmin-width: 2.5rem;\n\tmin-height: 2.5rem;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus-visible {\n\tbox-shadow: inset 0 0 0 100vmax var(--mol_theme_hover);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button_minor) = class $mol_button_minor extends ($.$mol_button_typed) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor]:where(:not([disabled])) {\n\tcolor: var(--mol_theme_control);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$bog_ui_sidebar_item) = class $bog_ui_sidebar_item extends ($.$mol_button_minor) {
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.label())]);
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon();
			return obj;
		}
		label(){
			return "";
		}
		active(){
			return false;
		}
		collapsed(next){
			if(next !== undefined) return next;
			return false;
		}
		sub(){
			return [(this.Icon()), (this.Label())];
		}
		attr(){
			return {
				...(super.attr()), 
				"bog_ui_sidebar_item_active": (this.active()), 
				"bog_ui_sidebar_item_collapsed": (this.collapsed())
			};
		}
	};
	($mol_mem(($.$bog_ui_sidebar_item.prototype), "Label"));
	($mol_mem(($.$bog_ui_sidebar_item.prototype), "Icon"));
	($mol_mem(($.$bog_ui_sidebar_item.prototype), "collapsed"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/sidebar/item/item.view.css", "[bog_ui_sidebar_item]:not([bog_ui_sidebar_item_active=\"true\"]):hover {\n\tbackground: var(--mol_theme_card);\n}\n\n[bog_ui_sidebar_item_label] {\n\ttransition: width 0.2s ease, opacity 0.15s ease;\n}\n\n[bog_ui_sidebar_item_collapsed=\"true\"] [bog_ui_sidebar_item_label] {\n\twidth: 0;\n\toverflow: hidden;\n\topacity: 0;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_sidebar_item, {
        display: 'flex',
        flex: {
            shrink: 1,
        },
        align: {
            items: 'center',
        },
        gap: '.75rem',
        padding: {
            top: '.5rem',
            bottom: '.5rem',
            left: '.75rem',
            right: '.75rem',
        },
        border: {
            radius: $mol_gap.round,
        },
        color: $mol_theme.text,
        overflow: 'hidden',
        Icon: {
            flex: {
                shrink: 0,
            },
        },
        Label: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: {
                shrink: 1,
            },
        },
        '@': {
            bog_ui_sidebar_item_active: {
                'true': {
                    background: {
                        color: $mol_theme.current,
                    },
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_icon_tag) = class $mol_icon_tag extends ($.$mol_icon) {
		path(){
			return "M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.44 21.77,11.94 21.41,11.58Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_file) = class $mol_icon_file extends ($.$mol_icon) {
		path(){
			return "M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_rectangle) = class $mol_icon_rectangle extends ($.$mol_icon) {
		path(){
			return "M4,6V19H20V6H4Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_navigation) = class $mol_icon_navigation extends ($.$mol_icon) {
		path(){
			return "M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_dock_left) = class $mol_icon_dock_left extends ($.$mol_icon) {
		path(){
			return "M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V6A2 2 0 0 0 20 4M20 18H9V6H20Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_card) = class $mol_icon_card extends ($.$mol_icon) {
		path(){
			return "M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_bell) = class $mol_icon_bell extends ($.$mol_icon) {
		path(){
			return "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21";
		}
	};


;
"use strict";


;
	($.$mol_icon_console) = class $mol_icon_console extends ($.$mol_icon) {
		path(){
			return "M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_table) = class $mol_icon_table extends ($.$mol_icon) {
		path(){
			return "M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_minus) = class $mol_icon_minus extends ($.$mol_icon) {
		path(){
			return "M19,13H5V11H19V13Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_message) = class $mol_icon_message extends ($.$mol_icon) {
		path(){
			return "M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z";
		}
	};


;
"use strict";


;
	($.$mol_list) = class $mol_list extends ($.$mol_view) {
		gap_before(){
			return 0;
		}
		Gap_before(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_before())});
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		gap_after(){
			return 0;
		}
		Gap_after(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_after())});
			return obj;
		}
		rows(){
			return [
				(this.Gap_before()), 
				(this.Empty()), 
				(this.Gap_after())
			];
		}
		render_visible_only(){
			return true;
		}
		render_over(){
			return 0.1;
		}
		sub(){
			return (this.rows());
		}
		item_height_min(id){
			return 1;
		}
		item_width_min(id){
			return 1;
		}
		view_window_shift(next){
			if(next !== undefined) return next;
			return 0;
		}
		view_window(){
			return [0, 0];
		}
	};
	($mol_mem(($.$mol_list.prototype), "Gap_before"));
	($mol_mem(($.$mol_list.prototype), "Empty"));
	($mol_mem(($.$mol_list.prototype), "Gap_after"));
	($mol_mem(($.$mol_list.prototype), "view_window_shift"));


;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = this.$mol_dom_context.CSS?.supports('overflow-anchor:auto') ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.
         * `mol_list` should contain only components that inherits `mol_view`. You should not place raw strings or numbers in list.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_list_demo
         */
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                const next = (rows.length === 0) ? [this.Empty()] : rows;
                const prev = $mol_mem_cached(() => this.sub());
                const [start, end] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                if (prev && $mol_mem_cached(() => prev[start] !== next[start])) {
                    const index = $mol_mem_cached(() => next.indexOf(prev[start])) ?? -1;
                    if (index >= 0)
                        this.view_window_shift(index - start);
                }
                return next;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            _view_window_last = [0, 0];
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? this._view_window_last;
                const shift = this.view_window_shift();
                this.view_window_shift(0);
                min += shift;
                max += shift;
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                // change nothing when already covers all limits
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                // jumps when fully over limits
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = this.item_height_min(min);
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                // force recalc min when overlapse top limit
                if (anchoring && (top < limit_top) && (bottom < limit_bottom) && (max < kids.length)) {
                    min2 = max;
                    top2 = bottom;
                }
                // force recalc max when overlapse bottom limit
                if ((bottom > limit_bottom) && (top > limit_top) && (min > 0)) {
                    max2 = min;
                    bottom2 = top;
                }
                // extend min to cover top limit
                while (anchoring && ((top2 > limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= this.item_height_min(min2);
                }
                // extend max to cover bottom limit
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += this.item_height_min(max2);
                    ++max2;
                }
                return [min2, max2];
            }
            item_height_min(index) {
                try {
                    return this.sub()[index]?.minimal_height() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            row_width_min(index) {
                try {
                    return this.sub()[index]?.minimal_width() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            gap_before() {
                let gap = 0;
                const skipped = this.view_window()[0];
                for (let i = 0; i < skipped; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            gap_after() {
                let gap = 0;
                const from = this.view_window()[1];
                const to = this.sub().length;
                for (let i = from; i < to; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this._view_window_last = this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                let height = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    height += this.item_height_min(i);
                return height;
            }
            minimal_width() {
                let width = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    width = Math.max(width, this.item_width_min(i));
                return width;
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_width", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\tmin-height: 1.5rem;\n\t/* will-change: contents; */\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_menu) = class $mol_icon_menu extends ($.$mol_icon) {
		path(){
			return "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
		}
	};


;
"use strict";


;
	($.$bog_ui_sidebar) = class $bog_ui_sidebar extends ($.$mol_view) {
		Header(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([]);
			return obj;
		}
		items_with_collapsed(){
			return [];
		}
		Items(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.items_with_collapsed()));
			return obj;
		}
		Footer(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([]);
			return obj;
		}
		toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		Toggle_icon(){
			const obj = new this.$.$mol_icon_menu();
			return obj;
		}
		Toggle(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.toggle(next)));
			(obj.sub) = () => ([(this.Toggle_icon())]);
			return obj;
		}
		mode(next){
			if(next !== undefined) return next;
			return "dock";
		}
		items(){
			return [];
		}
		sub(){
			return [
				(this.Header()), 
				(this.Items()), 
				(this.Footer()), 
				(this.Toggle())
			];
		}
		attr(){
			return {"bog_ui_sidebar_mode": (this.mode())};
		}
	};
	($mol_mem(($.$bog_ui_sidebar.prototype), "Header"));
	($mol_mem(($.$bog_ui_sidebar.prototype), "Items"));
	($mol_mem(($.$bog_ui_sidebar.prototype), "Footer"));
	($mol_mem(($.$bog_ui_sidebar.prototype), "toggle"));
	($mol_mem(($.$bog_ui_sidebar.prototype), "Toggle_icon"));
	($mol_mem(($.$bog_ui_sidebar.prototype), "Toggle"));
	($mol_mem(($.$bog_ui_sidebar.prototype), "mode"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_sidebar extends $.$bog_ui_sidebar {
            items_with_collapsed() {
                const collapsed = this.mode() === 'rail';
                return this.items().map(item => {
                    if (item instanceof $bog_ui_sidebar_item) {
                        item.collapsed(collapsed);
                    }
                    return item;
                });
            }
            toggle(next) {
                if (next !== undefined) {
                    this.mode(this.mode() === 'dock' ? 'rail' : 'dock');
                }
                return null;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_ui_sidebar.prototype, "items_with_collapsed", null);
        __decorate([
            $mol_action
        ], $bog_ui_sidebar.prototype, "toggle", null);
        $$.$bog_ui_sidebar = $bog_ui_sidebar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/sidebar/sidebar.view.css", "[bog_ui_sidebar] {\n\ttransition: width 0.2s ease, min-width 0.2s ease;\n}\n\n[bog_ui_sidebar_mode=\"dock\"] {\n\twidth: clamp(180px, 20%, 280px);\n\tmin-width: clamp(180px, 20%, 280px);\n}\n\n[bog_ui_sidebar_mode=\"rail\"] {\n\twidth: 56px;\n\tmin-width: 56px;\n}\n\n[bog_ui_sidebar_mode=\"hidden\"] {\n\twidth: 0;\n\tmin-width: 0;\n\tpadding: 0;\n\toverflow: hidden;\n}\n\n[bog_ui_sidebar_mode=\"hidden\"] > * {\n\topacity: 0;\n\tpointer-events: none;\n}\n\n[bog_ui_sidebar_mode] > * {\n\ttransition: opacity 0.15s ease;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_sidebar, {
        display: 'flex',
        flex: {
            direction: 'column',
            shrink: 0,
        },
        overflow: 'hidden',
        background: {
            color: $mol_theme.back,
        },
        border: {
            radius: 0,
        },
        padding: {
            top: '.5rem',
            bottom: '.5rem',
            left: '.5rem',
            right: '.5rem',
        },
        Header: {
            padding: {
                top: '.5rem',
                bottom: '.5rem',
                left: '.75rem',
                right: '.75rem',
            },
        },
        Items: {
            flex: {
                grow: 1,
            },
            overflow: {
                y: 'auto',
                x: 'hidden',
            },
        },
        Footer: {
            padding: {
                top: '.5rem',
                bottom: '.5rem',
                left: '.75rem',
                right: '.75rem',
            },
        },
        Toggle: {
            flex: {
                shrink: 0,
            },
            align: {
                self: 'flex-start',
            },
            padding: {
                top: '.5rem',
                bottom: '.5rem',
                left: '.75rem',
                right: '.75rem',
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_check) = class $mol_check extends ($.$mol_button_minor) {
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		aria_checked(){
			return "false";
		}
		aria_role(){
			return "checkbox";
		}
		Icon(){
			return null;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		label(){
			return [(this.Title())];
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_check_checked": (this.checked()), 
				"aria-checked": (this.aria_checked()), 
				"role": (this.aria_role())
			};
		}
		sub(){
			return [(this.Icon()), (this.label())];
		}
	};
	($mol_mem(($.$mol_check.prototype), "checked"));
	($mol_mem(($.$mol_check.prototype), "Title"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_event extends $mol_object {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        prevented(next) {
            if (next)
                this.native.preventDefault();
            return this.native.defaultPrevented;
        }
        static wrap(event) {
            return new this.$.$mol_dom_event(event);
        }
    }
    __decorate([
        $mol_action
    ], $mol_dom_event.prototype, "prevented", null);
    __decorate([
        $mol_action
    ], $mol_dom_event, "wrap", null);
    $.$mol_dom_event = $mol_dom_event;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\t/* align-items: flex-start; */\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: left;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Checkbox UI component. See Variants for more concrete implementations.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_box_demo
         */
        class $mol_check extends $.$mol_check {
            click(next) {
                const event = next ? $mol_dom_event.wrap(next) : null;
                if (event?.prevented())
                    return;
                event?.prevented(true);
                this.checked(!this.checked());
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
            aria_checked() {
                return String(this.checked());
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_check_icon) = class $mol_check_icon extends ($.$mol_check) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/icon/icon.view.css", "[mol_check_icon]:where([mol_check_checked]) {\n\tcolor: var(--mol_theme_current);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_brightness_4) = class $mol_icon_brightness_4 extends ($.$mol_icon) {
		path(){
			return "M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z";
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12); // 4KB Mem Page
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) { // ASCII - 1 octet
                buf[pos++] = code;
            }
            else if (code < 0x800) { // 2 octet
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) { // 3 octet
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else { // surrogate pair
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            // Если путь выше или равен base или если parent такойже как и this - считаем это корнем
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            // Отслеживать проверку наличия родительской папки не стоит до корня диска
            // Лучше ограничить mam-ом
            if (!this.root()) {
                /*
                Если parent папка удалилась, надо ресетнуть все объекты в ней на любой глубине.
                Например, rm -rf с последующим git pull: parent папка может удалиться, потом создасться,
                а текущая папка успеет только удалиться до момента выполнения stat.
                Поэтому parent.exists() не запустит перевычисления, нужна именно parent.version()

                Однако, parent.version() меняется не только при удалении, будет ложное срабатывание
                С этим придется мириться, красивого решения пока нет.
                */
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            // console.log(type, path)
            // add (change): добавился файл - у parent надо обновить список sub, если он был заюзан
            // change, unlink (rename): обновился или удалился файл - ресетим
            // addDir (change), добавилась папка, у parent обновляем список директорий в sub
            // дочерние ресетим
            // unlinkDir (rename), удалилась папка, ресетим ее
            // stat у всех дочерних обновится сам, т.к. связан с parent.version()
            this.changed.add(file);
            if (!this.watching)
                return;
            // throttle, пока события поступают не сбрасываем.
            // аналог awaitWriteFinish из chokidar
            // интервалы между change-сообщениями модифицируемого файла должны быть меньше watch_debounce
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce() { return 500; }
        static flush() {
            // Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
            // на каждом перезапуске они применятся
            // Пока run выполняется, изменения накапливаются, в конце run вызывается flush
            // Пока применяются изменения, run должен ожидать конца flush
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
            // this.watch_wd?.destructor()
            // this.watch_wd = null
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            // run должен ожидать конца flush
            this.flush();
            this.watching = false;
            /*
            watch запаздывает и событие может прилететь через 3 сек после окончания сайд эффекта
            поэтому добавляем папку, которую меняет side_effect
            Когда дойдет до выполнения flush, он ресетнет ее
            
            Иначе будут лишние срабатывания
            Например, удалили hyoo/board, watch ресетит и exists начинает отдавать false, срабатывает git clone
            Сразу после него событие addDir еще не успело прийти,
            на следующем перезапуске вызывается git pull, т.к.
            с точки зрения реактивной системы hyoo/board еще не существует.
            */
            this.changed.add(this.absolute(path));
        }
        // protected static watch_wd = null as null | $mol_after_timeout
        static unwatched(side_effect, affected_dir) {
            // ждем, пока выполнится предыдущий unwatched
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            // console.log('version', next, this.path())
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        // open( ... modes: readonly $mol_file_mode[] ) { return 0 }
        buffer(next) {
            // Если версия пустая - возвращаем пустой буфер
            let readed = new Uint8Array();
            if (next === undefined) {
                // Если меняется версия файла, буфер надо перечитать
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                // Логируем, если повторно читаем/пишем и буфер поменялся
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            // Если буфер при записи не поменялся и файл не удаляли перед этим - не записываем новую версию.
            // Если записывать, это приведет к смене mtime и вотчер снова триггернется, даже если содержимое файла не поменялось.
            // В этом алгоритме есть изъян.
            // Если файл записали, потом отключили вотчер, кто-то из вне его поменял, потом включили вотчер, снова записали тот же буфер,
            // то буфер не запишется на диск, т.к. кэш не консистентен с диском.
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        // static watch_root = ''
        // static watcher_warned = false
        watcher() {
            // const constructor = this.constructor as typeof $mol_file_base
            // if (! constructor.watcher_warned) {
            // 	console.warn(`${constructor}.watcher() not implemented`)
            // 	constructor.watcher_warned = true
            // }
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            // console.log('exists current', exists, 'next', next, this.path())
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            // Если записываем text, и вотчер ресетнул записанный файл,
            // то надо снова его обновить, вызвать логику, которая делала пуш в text.
            // Например файл удалили, потом снова создали, версия поменялась - перезаписываем
            // Если использовать version, то вновь созданный файл, через вотчер запустит свое пересоздание
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            // Если дочерний file удалился, список надо обновить
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_rest_code;
    (function ($mol_rest_code) {
        $mol_rest_code[$mol_rest_code["Continue"] = 100] = "Continue";
        $mol_rest_code[$mol_rest_code["Switching protocols"] = 101] = "Switching protocols";
        $mol_rest_code[$mol_rest_code["Processing"] = 102] = "Processing";
        $mol_rest_code[$mol_rest_code["OK"] = 200] = "OK";
        $mol_rest_code[$mol_rest_code["Created"] = 201] = "Created";
        $mol_rest_code[$mol_rest_code["Accepted"] = 202] = "Accepted";
        $mol_rest_code[$mol_rest_code["Non-Authoritative Information"] = 203] = "Non-Authoritative Information";
        $mol_rest_code[$mol_rest_code["No Content"] = 204] = "No Content";
        $mol_rest_code[$mol_rest_code["Reset Content"] = 205] = "Reset Content";
        $mol_rest_code[$mol_rest_code["Partial Content"] = 206] = "Partial Content";
        $mol_rest_code[$mol_rest_code["Multi Status"] = 207] = "Multi Status";
        $mol_rest_code[$mol_rest_code["Already Reported"] = 208] = "Already Reported";
        $mol_rest_code[$mol_rest_code["IM Used"] = 226] = "IM Used";
        $mol_rest_code[$mol_rest_code["Multiple Choices"] = 300] = "Multiple Choices";
        $mol_rest_code[$mol_rest_code["Moved Permanently"] = 301] = "Moved Permanently";
        $mol_rest_code[$mol_rest_code["Found"] = 302] = "Found";
        $mol_rest_code[$mol_rest_code["See Other"] = 303] = "See Other";
        $mol_rest_code[$mol_rest_code["Not Modified"] = 304] = "Not Modified";
        $mol_rest_code[$mol_rest_code["Use Proxy"] = 305] = "Use Proxy";
        $mol_rest_code[$mol_rest_code["Temporary Redirect"] = 307] = "Temporary Redirect";
        $mol_rest_code[$mol_rest_code["Bad Request"] = 400] = "Bad Request";
        $mol_rest_code[$mol_rest_code["Unauthorized"] = 401] = "Unauthorized";
        $mol_rest_code[$mol_rest_code["Payment Required"] = 402] = "Payment Required";
        $mol_rest_code[$mol_rest_code["Forbidden"] = 403] = "Forbidden";
        $mol_rest_code[$mol_rest_code["Not Found"] = 404] = "Not Found";
        $mol_rest_code[$mol_rest_code["Method Not Allowed"] = 405] = "Method Not Allowed";
        $mol_rest_code[$mol_rest_code["Not Acceptable"] = 406] = "Not Acceptable";
        $mol_rest_code[$mol_rest_code["Proxy Authentication Required"] = 407] = "Proxy Authentication Required";
        $mol_rest_code[$mol_rest_code["Request Timeout"] = 408] = "Request Timeout";
        $mol_rest_code[$mol_rest_code["Conflict"] = 409] = "Conflict";
        $mol_rest_code[$mol_rest_code["Gone"] = 410] = "Gone";
        $mol_rest_code[$mol_rest_code["Length Required"] = 411] = "Length Required";
        $mol_rest_code[$mol_rest_code["Precondition Failed"] = 412] = "Precondition Failed";
        $mol_rest_code[$mol_rest_code["Request Entity Too Large"] = 413] = "Request Entity Too Large";
        $mol_rest_code[$mol_rest_code["Request URI Too Long"] = 414] = "Request URI Too Long";
        $mol_rest_code[$mol_rest_code["Unsupported Media Type"] = 415] = "Unsupported Media Type";
        $mol_rest_code[$mol_rest_code["Requested Range Not Satisfiable"] = 416] = "Requested Range Not Satisfiable";
        $mol_rest_code[$mol_rest_code["Expectation Failed"] = 417] = "Expectation Failed";
        $mol_rest_code[$mol_rest_code["Teapot"] = 418] = "Teapot";
        $mol_rest_code[$mol_rest_code["Unprocessable Entity"] = 422] = "Unprocessable Entity";
        $mol_rest_code[$mol_rest_code["Locked"] = 423] = "Locked";
        $mol_rest_code[$mol_rest_code["Failed Dependency"] = 424] = "Failed Dependency";
        $mol_rest_code[$mol_rest_code["Upgrade Required"] = 426] = "Upgrade Required";
        $mol_rest_code[$mol_rest_code["Precondition Required"] = 428] = "Precondition Required";
        $mol_rest_code[$mol_rest_code["Too Many Requests"] = 429] = "Too Many Requests";
        $mol_rest_code[$mol_rest_code["Request Header Fields Too Large"] = 431] = "Request Header Fields Too Large";
        $mol_rest_code[$mol_rest_code["Unavailable For Legal Reasons"] = 451] = "Unavailable For Legal Reasons";
        $mol_rest_code[$mol_rest_code["Internal Server Error"] = 500] = "Internal Server Error";
        $mol_rest_code[$mol_rest_code["Not Implemented"] = 501] = "Not Implemented";
        $mol_rest_code[$mol_rest_code["Bad Gateway"] = 502] = "Bad Gateway";
        $mol_rest_code[$mol_rest_code["Service Unavailable"] = 503] = "Service Unavailable";
        $mol_rest_code[$mol_rest_code["Gateway Timeout"] = 504] = "Gateway Timeout";
        $mol_rest_code[$mol_rest_code["HTTP Version Not Supported"] = 505] = "HTTP Version Not Supported";
        $mol_rest_code[$mol_rest_code["Insufficient Storage"] = 507] = "Insufficient Storage";
        $mol_rest_code[$mol_rest_code["Loop Detected"] = 508] = "Loop Detected";
        $mol_rest_code[$mol_rest_code["Not Extended"] = 510] = "Not Extended";
        $mol_rest_code[$mol_rest_code["Network Authentication Required"] = 511] = "Network Authentication Required";
        $mol_rest_code[$mol_rest_code["Network Read Timeout Error"] = 598] = "Network Read Timeout Error";
        $mol_rest_code[$mol_rest_code["Network Connect Timeout Error"] = 599] = "Network Connect Timeout Error";
    })($mol_rest_code = $.$mol_rest_code || ($.$mol_rest_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            // в nodejs, что б не дублировалось cause в консоли
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function pass(data) {
        return data;
    }
    function $mol_error_fence(task, fallback, loading = pass) {
        try {
            return task();
        }
        catch (error) {
            let normalized;
            try {
                normalized = $mol_promise_like(error) ? loading(error) : fallback(error);
            }
            catch (sub_error) {
                normalized = $mol_promise_like(sub_error) ? sub_error : new $mol_error_mix(sub_error.message, { error }, sub_error);
            }
            if (normalized instanceof Error || $mol_promise_like(normalized)) {
                $mol_fail_hidden(normalized);
            }
            return normalized;
        }
    }
    $.$mol_error_fence = $mol_error_fence;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_enriched(cause, cb) {
        return $mol_error_fence(cb, e => new $mol_error_mix(e.message, cause, e));
    }
    $.$mol_error_enriched = $mol_error_enriched;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object {
        native;
        request;
        status() {
            const types = ['unknown', 'inform', 'success', 'redirect', 'wrong', 'failed'];
            return types[Math.floor(this.native.status / 100)];
        }
        code() {
            return this.native.status;
        }
        ok() {
            return this.native.ok;
        }
        message() {
            return $mol_rest_code[this.code()] || `HTTP Error ${this.code()}`;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const mime = this.mime() || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).json());
        }
        blob() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).blob());
        }
        buffer() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).arrayBuffer());
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch_request extends $mol_object {
        native;
        response_async() {
            const controller = new AbortController();
            let done = false;
            const request = new Request(this.native, { signal: controller.signal });
            const promise = fetch(request).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    // Abort of done request breaks response parsing
                    if (!done && !controller.signal.aborted)
                        controller.abort();
                },
            });
        }
        response() {
            return this.$.$mol_fetch_response.make({
                native: $mol_wire_sync(this).response_async(),
                request: this
            });
        }
        success() {
            const response = this.response();
            if (response.status() === 'success')
                return response;
            throw new Error(response.message(), { cause: response });
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_request.prototype, "response", null);
    $.$mol_fetch_request = $mol_fetch_request;
    class $mol_fetch extends $mol_object {
        static request(input, init) {
            return this.$.$mol_fetch_request.make({
                native: new Request(input, init)
            });
        }
        static response(input, init) {
            return this.request(input, init).response();
        }
        static success(input, init) {
            return this.request(input, init).success();
        }
        static stream(input, init) {
            return this.success(input, init).stream();
        }
        static text(input, init) {
            return this.success(input, init).text();
        }
        static json(input, init) {
            return this.success(input, init).json();
        }
        static blob(input, init) {
            return this.success(input, init).blob();
        }
        static buffer(input, init) {
            return this.success(input, init).buffer();
        }
        static xml(input, init) {
            return this.success(input, init).xml();
        }
        static xhtml(input, init) {
            return this.success(input, init).xhtml();
        }
        static html(input, init) {
            return this.success(input, init).html();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "request", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_webdav extends $mol_file_base {
        static relative(path) {
            return this.absolute(new URL(path, this.base).toString());
        }
        resolve(path) {
            let res = this.path() + '/' + path;
            while (true) {
                let prev = res;
                // foo/../ -> /
                res = res.replace(/\/[^\/.]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            // http://localhost/.. -> http://localhost
            res = res.replace(/\/\.\.\/?$/, '');
            if (res === this.path())
                return this;
            return this.constructor.absolute(res);
        }
        static headers() { return {}; }
        headers() { return this.constructor.headers(); }
        fetch(init) {
            return this.$.$mol_fetch.success(this.path(), {
                ...init,
                headers: {
                    ...this.headers(),
                    ...init.headers,
                }
            });
        }
        read() {
            try {
                const response = this.fetch({});
                return new Uint8Array(response.buffer());
            }
            catch (error) {
                if (error instanceof Error
                    && error.cause instanceof $mol_fetch_response
                    && error.cause.native.status === 404)
                    return new Uint8Array;
                $mol_fail_hidden(error);
            }
        }
        write(body) { this.fetch({ method: 'PUT', body }); }
        ensure() { this.fetch({ method: 'MKCOL' }); }
        drop() { this.fetch({ method: 'DELETE' }); }
        copy(to) {
            this.fetch({
                method: 'COPY',
                headers: { Destination: to }
            });
        }
        kids() {
            const response = this.fetch({ method: 'PROPFIND' });
            const xml = response.xml();
            const result = [];
            for (const multistatus of xml.childNodes) {
                if (multistatus.nodeName !== 'D:multistatus')
                    continue;
                for (const response of multistatus.childNodes) {
                    let path;
                    if (response.nodeName === 'D:href')
                        path = response.textContent ?? '';
                    if (!path)
                        continue;
                    if (response.nodeName !== 'D:propstat')
                        continue;
                    const stat = webdav_stat(response);
                    const file = this.resolve(path);
                    file.stat(stat, 'virt');
                    result.push(file);
                }
            }
            return result;
        }
        readable(opts) {
            return this.fetch({
                headers: !opts.start ? {} : {
                    'Range': `bytes=${opts.start}-${opts.end ?? ''}`
                }
            }).stream() || $mol_fail(new Error('Not found'));
        }
        info() {
            return this.kids().at(0)?.stat() ?? null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_file_webdav.prototype, "readable", null);
    $.$mol_file_webdav = $mol_file_webdav;
    function webdav_stat(prop_stat) {
        const now = new Date();
        const stat = {
            type: 'file',
            size: 0,
            atime: now,
            mtime: now,
            ctime: now,
        };
        for (const prop of prop_stat.childNodes) {
            if (prop.nodeName !== 'D:prop')
                continue;
            for (const value of prop.childNodes) {
                const name = value.nodeName;
                const text = value.textContent ?? '';
                if (name === 'D:getcontenttype') {
                    stat.type = text.endsWith('directory') ? 'dir' : 'file';
                }
                if (name === 'D:getcontentlength') {
                    stat.size = Number(value.textContent || '0');
                    if (Number.isNaN(stat.size))
                        stat.size = 0;
                }
                if (name === 'D:getlastmodified')
                    stat.mtime = stat.atime = new Date(text);
                if (name === 'D:creationdate')
                    stat.ctime = new Date(text);
            }
        }
        return stat;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_web extends $mol_file_webdav {
        static base = new URL('.', $mol_dom_context.document?.currentScript?.['src'] ?? globalThis.location.href).toString();
        // Вотчер выключен, версия всегда будет одна
        // Если пустая строка - будет считаться, что файла нет
        version() { return '1'; }
        // Ворнинги подавляем, иначе в каждом приложении, загружающим локали, будет ворнинг
        // override watcher() { return { destructor() {} }}
        info() {
            // Директории не поддерживаются
            try {
                const response = this.fetch({ method: 'HEAD' });
                const headers = response.headers();
                let size = Number(headers.get('Content-Length'));
                if (Number.isNaN(size))
                    size = 0;
                const last = headers.get('Last-Modified');
                const mtime = last ? new Date(last) : new Date();
                return {
                    type: 'file',
                    size,
                    mtime,
                    atime: mtime,
                    ctime: mtime,
                };
            }
            catch (error) {
                if (error instanceof Error
                    && error.cause instanceof $mol_fetch_response
                    && error.cause.native.status === 404)
                    return null;
                $mol_fail_hidden(error);
            }
        }
    }
    $.$mol_file_web = $mol_file_web;
    $.$mol_file = $mol_file_web;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
	($.$mol_lights_toggle) = class $mol_lights_toggle extends ($.$mol_check_icon) {
		Lights_icon(){
			const obj = new this.$.$mol_icon_brightness_4();
			return obj;
		}
		lights(next){
			if(next !== undefined) return next;
			return false;
		}
		Icon(){
			return (this.Lights_icon());
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_lights_toggle_hint"));
		}
		checked(next){
			return (this.lights(next));
		}
	};
	($mol_mem(($.$mol_lights_toggle.prototype), "Lights_icon"));
	($mol_mem(($.$mol_lights_toggle.prototype), "lights"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Toggle for Switcher between light/dark themes (usually for `mol_theme_auto` plugin).
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
         */
        class $mol_lights_toggle extends $.$mol_lights_toggle {
            lights(next) {
                return this.$.$mol_lights(next);
            }
        }
        $$.$mol_lights_toggle = $mol_lights_toggle;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_page) = class $mol_page extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		Logo(){
			return null;
		}
		title_content(){
			return [(this.Logo()), (this.title())];
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ((this.title_content()));
			return obj;
		}
		tools(){
			return [];
		}
		Tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.tools()));
			return obj;
		}
		head(){
			return [(this.Title()), (this.Tools())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (64);
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		body_scroll_top(next){
			return (this.Body().scroll_top(next));
		}
		body(){
			return [];
		}
		Body_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		body_content(){
			return [(this.Body_content())];
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ((this.body_content()));
			return obj;
		}
		foot(){
			return [];
		}
		Foot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("footer");
			(obj.sub) = () => ((this.foot()));
			return obj;
		}
		dom_name(){
			return "article";
		}
		attr(){
			return {...(super.attr()), "tabIndex": (this.tabindex())};
		}
		sub(){
			return [
				(this.Head()), 
				(this.Body()), 
				(this.Foot())
			];
		}
	};
	($mol_mem(($.$mol_page.prototype), "Title"));
	($mol_mem(($.$mol_page.prototype), "Tools"));
	($mol_mem(($.$mol_page.prototype), "Head"));
	($mol_mem(($.$mol_page.prototype), "Body_content"));
	($mol_mem(($.$mol_page.prototype), "Body"));
	($mol_mem(($.$mol_page.prototype), "Foot"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem } = $mol_style_unit;
        const { hsla, blur } = $mol_style_func;
        $mol_style_define($mol_page, {
            display: 'flex',
            flex: {
                basis: 'auto',
                direction: 'column',
            },
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: per(100),
            maxHeight: per(100),
            boxSizing: 'border-box',
            color: $mol_theme.text,
            // backdropFilter: blur( `3px` ), enforces layering
            // zIndex: 0 ,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 'none',
                position: 'relative',
                margin: 0,
                minHeight: rem(4),
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 2,
                '@media': {
                    'print': {
                        box: {
                            shadow: [[0, `1px`, 0, 0, hsla(0, 0, 0, .25)]],
                        },
                    },
                },
            },
            Title: {
                minHeight: rem(2),
                margin: 0,
                padding: $mol_gap.text,
                gap: $mol_gap.text,
                wordBreak: 'normal',
                textShadow: '0 0',
                font: {
                    size: 'inherit',
                    weight: 'normal',
                },
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
            Tools: {
                flex: {
                    basis: 'auto',
                    grow: 0,
                    shrink: 1,
                },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                '@media': {
                    'print': {
                        display: 'none',
                    },
                },
            },
            Body: {
                flex: {
                    grow: 1000,
                    shrink: 1,
                    basis: per(100),
                },
            },
            Body_content: {
                padding: $mol_gap.block,
                minHeight: 0,
                minWidth: 0,
                flex: {
                    direction: 'column',
                    shrink: 1,
                    grow: 1,
                },
                justify: {
                    self: 'stretch',
                },
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: 'none',
                margin: 0,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 1,
                padding: $mol_gap.block,
                ':empty': {
                    display: 'none',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_hotkey) = class $mol_hotkey extends ($.$mol_plugin) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		key(){
			return {};
		}
		mod_ctrl(){
			return false;
		}
		mod_alt(){
			return false;
		}
		mod_shift(){
			return false;
		}
	};
	($mol_mem(($.$mol_hotkey.prototype), "keydown"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which adds handlers for keyboard keys.
         * @see [mol_keyboard_code](../keyboard/code/code.ts)
         */
        class $mol_hotkey extends $.$mol_hotkey {
            key() {
                return super.key();
            }
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                if (this.mod_ctrl() !== (event.ctrlKey || event.metaKey))
                    return;
                if (this.mod_alt() !== event.altKey)
                    return;
                if (this.mod_shift() !== event.shiftKey)
                    return;
                const handle = this.key()[name];
                if (handle)
                    handle(event);
            }
        }
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_string) = class $mol_string extends ($.$mol_view) {
		selection_watcher(){
			return null;
		}
		error_report(){
			return null;
		}
		disabled(){
			return false;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.value(next));
		}
		hint(){
			return "";
		}
		hint_visible(){
			return (this.hint());
		}
		spellcheck(){
			return true;
		}
		autocomplete_native(){
			return "";
		}
		selection_end(){
			return 0;
		}
		selection_start(){
			return 0;
		}
		keyboard(){
			return "text";
		}
		enter(){
			return "go";
		}
		length_max(){
			return +Infinity;
		}
		type(next){
			if(next !== undefined) return next;
			return "text";
		}
		event_change(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return false;
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_hotkey();
			(obj.mod_ctrl) = () => ((this.submit_with_ctrl()));
			(obj.key) = () => ({"enter": (next) => (this.submit(next))});
			return obj;
		}
		dom_name(){
			return "input";
		}
		enabled(){
			return true;
		}
		minimal_height(){
			return 40;
		}
		autocomplete(){
			return false;
		}
		selection(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		auto(){
			return [(this.selection_watcher()), (this.error_report())];
		}
		field(){
			return {
				...(super.field()), 
				"disabled": (this.disabled()), 
				"value": (this.value_changed()), 
				"placeholder": (this.hint_visible()), 
				"spellcheck": (this.spellcheck()), 
				"autocomplete": (this.autocomplete_native()), 
				"selectionEnd": (this.selection_end()), 
				"selectionStart": (this.selection_start()), 
				"inputMode": (this.keyboard()), 
				"enterkeyhint": (this.enter())
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"maxlength": (this.length_max()), 
				"type": (this.type())
			};
		}
		event(){
			return {...(super.event()), "input": (next) => (this.event_change(next))};
		}
		plugins(){
			return [(this.Submit())];
		}
	};
	($mol_mem(($.$mol_string.prototype), "value"));
	($mol_mem(($.$mol_string.prototype), "type"));
	($mol_mem(($.$mol_string.prototype), "event_change"));
	($mol_mem(($.$mol_string.prototype), "submit"));
	($mol_mem(($.$mol_string.prototype), "Submit"));
	($mol_mem(($.$mol_string.prototype), "selection"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * An input field for entering single line text.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_string_demo
         */
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                const el = this.dom_node();
                const from = el.selectionStart;
                const to = el.selectionEnd;
                try {
                    el.value = this.value_changed(el.value);
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                    $mol_fail_hidden(error);
                }
                if (to === null)
                    return;
                el.selectionEnd = to;
                el.selectionStart = from;
                this.selection_change(next);
            }
            error_report() {
                try {
                    if (this.focused())
                        this.value();
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                }
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
                if (to !== from && el.selectionEnd === el.selectionStart) {
                    el.selectionEnd = to;
                }
            }
            selection_start() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionStart == null)
                    return undefined;
                return this.selection()[0];
            }
            selection_end() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionEnd == null)
                    return undefined;
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_action
        ], $mol_string.prototype, "event_change", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "error_report", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tposition: relative;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$bog_ui_command) = class $bog_ui_command extends ($.$mol_view) {
		backdrop_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Backdrop(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({"click": (next) => (this.backdrop_click(next))});
			return obj;
		}
		key_down(next){
			if(next !== undefined) return next;
			return null;
		}
		Search(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Search commands…");
			(obj.value) = (next) => ((this.query(next)));
			return obj;
		}
		result_rows(){
			return [];
		}
		Results(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.result_rows()));
			return obj;
		}
		Dialog(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({"keydown": (next) => (this.key_down(next))});
			(obj.sub) = () => ([(this.Search()), (this.Results())]);
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		commands(){
			return [];
		}
		filtered(){
			return [];
		}
		selected(next){
			if(next !== undefined) return next;
			return 0;
		}
		sub(){
			return [(this.Backdrop()), (this.Dialog())];
		}
		attr(){
			return {"bog_ui_command_showed": (this.showed())};
		}
	};
	($mol_mem(($.$bog_ui_command.prototype), "backdrop_click"));
	($mol_mem(($.$bog_ui_command.prototype), "Backdrop"));
	($mol_mem(($.$bog_ui_command.prototype), "key_down"));
	($mol_mem(($.$bog_ui_command.prototype), "Search"));
	($mol_mem(($.$bog_ui_command.prototype), "Results"));
	($mol_mem(($.$bog_ui_command.prototype), "Dialog"));
	($mol_mem(($.$bog_ui_command.prototype), "showed"));
	($mol_mem(($.$bog_ui_command.prototype), "query"));
	($mol_mem(($.$bog_ui_command.prototype), "selected"));
	($.$bog_ui_command_group) = class $bog_ui_command_group extends ($.$mol_view) {
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		title(){
			return "";
		}
		sub(){
			return [(this.Title())];
		}
	};
	($mol_mem(($.$bog_ui_command_group.prototype), "Title"));
	($.$bog_ui_command_item) = class $bog_ui_command_item extends ($.$mol_button_minor) {
		execute(next){
			if(next !== undefined) return next;
			return null;
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.label())]);
			return obj;
		}
		Shortcut(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.shortcut())]);
			return obj;
		}
		label(){
			return "";
		}
		shortcut(){
			return "";
		}
		active(){
			return false;
		}
		click(next){
			return (this.execute(next));
		}
		sub(){
			return [(this.Label()), (this.Shortcut())];
		}
		attr(){
			return {...(super.attr()), "bog_ui_command_item_active": (this.active())};
		}
	};
	($mol_mem(($.$bog_ui_command_item.prototype), "execute"));
	($mol_mem(($.$bog_ui_command_item.prototype), "Label"));
	($mol_mem(($.$bog_ui_command_item.prototype), "Shortcut"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_command extends $.$bog_ui_command {
            backdrop_click(next) {
                if (next !== undefined) {
                    this.showed(false);
                }
                return null;
            }
            filtered() {
                const q = this.query().trim().toLowerCase();
                const commands = this.commands();
                if (!q)
                    return commands;
                return commands.filter((cmd) => {
                    if (cmd instanceof $bog_ui_command_group)
                        return false;
                    if (cmd instanceof $bog_ui_command_item) {
                        return cmd.label().toLowerCase().includes(q);
                    }
                    return false;
                });
            }
            result_rows() {
                const q = this.query().trim().toLowerCase();
                if (!q)
                    return this.commands();
                const filtered = this.filtered();
                if (filtered.length === 0)
                    return [];
                return filtered;
            }
            key_down(event) {
                if (!event)
                    return null;
                const key = event.key;
                if (key === 'Escape') {
                    event.preventDefault();
                    this.showed(false);
                    return null;
                }
                const items = this.filtered().filter((cmd) => cmd instanceof $bog_ui_command_item);
                if (items.length === 0)
                    return null;
                const sel = this.selected();
                if (key === 'ArrowDown') {
                    event.preventDefault();
                    this.selected((sel + 1) % items.length);
                    return null;
                }
                if (key === 'ArrowUp') {
                    event.preventDefault();
                    this.selected((sel - 1 + items.length) % items.length);
                    return null;
                }
                if (key === 'Enter') {
                    event.preventDefault();
                    const item = items[sel];
                    if (item)
                        item.execute(event);
                    this.showed(false);
                    return null;
                }
                return null;
            }
            selected(next) {
                this.query();
                return next ?? 0;
            }
        }
        __decorate([
            $mol_action
        ], $bog_ui_command.prototype, "backdrop_click", null);
        __decorate([
            $mol_mem
        ], $bog_ui_command.prototype, "filtered", null);
        __decorate([
            $mol_mem
        ], $bog_ui_command.prototype, "result_rows", null);
        __decorate([
            $mol_action
        ], $bog_ui_command.prototype, "key_down", null);
        __decorate([
            $mol_mem
        ], $bog_ui_command.prototype, "selected", null);
        $$.$bog_ui_command = $bog_ui_command;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/command/command.view.css", "[bog_ui_command] {\n\tvisibility: hidden;\n}\n\n[bog_ui_command_showed=\"true\"] {\n\tvisibility: visible;\n}\n\n[bog_ui_command] [bog_ui_command=\"Backdrop\"] {\n\ttransition: background-color 0.2s ease;\n}\n\n[bog_ui_command] [bog_ui_command=\"Dialog\"] {\n\twidth: clamp(280px, 90%, 640px);\n\tmax-height: 60vh;\n\topacity: 0;\n\ttransform: scale(0.95) translateY(-10px);\n\ttransition: opacity 0.2s ease, transform 0.2s ease;\n}\n\n[bog_ui_command_showed=\"true\"] [bog_ui_command=\"Dialog\"] {\n\topacity: 1;\n\ttransform: scale(1) translateY(0);\n}\n\n[bog_ui_command] [bog_ui_command=\"Results\"] {\n\tborder-top-width: 1px;\n\tmax-height: clamp(200px, 50vh, 400px);\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_command, {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        justify: { content: 'center' },
        padding: { top: '15vh' },
        Backdrop: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
                color: '#00000000',
            },
            pointerEvents: 'none',
        },
        Dialog: {
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flex: {
                direction: 'column',
            },
            background: {
                color: $mol_theme.back,
            },
            borderRadius: '0.5rem',
            boxShadow: '0 16px 48px #00000066',
            overflow: { y: 'hidden', x: 'hidden' },
            pointerEvents: 'auto',
        },
        Search: {
            padding: { top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem' },
            font: {
                size: '1rem',
            },
            border: {
                style: 'none',
            },
        },
        Results: {
            overflow: { y: 'auto', x: 'hidden' },
            flex: {
                grow: 1,
                shrink: 1,
            },
            padding: { top: '0.25rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' },
            border: {
                width: 0,
                style: 'solid',
                color: $mol_theme.line,
            },
        },
        '@': {
            bog_ui_command_showed: {
                true: {
                    pointerEvents: 'auto',
                    Backdrop: {
                        pointerEvents: 'auto',
                        background: {
                            color: '#00000066',
                        },
                    },
                },
            },
        },
    });
    $mol_style_define($bog_ui_command_group, {
        Title: {
            padding: { top: '0.75rem', bottom: '0.25rem', left: '0.5rem', right: '0.5rem' },
            font: {
                size: '0.7rem',
                weight: 'bold',
            },
            color: $mol_theme.shade,
            textTransform: 'uppercase',
            userSelect: 'none',
        },
    });
    $mol_style_define($bog_ui_command_item, {
        display: 'flex',
        justify: { content: 'space-between' },
        align: { items: 'center' },
        padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
        borderRadius: '0.5rem',
        cursor: 'pointer',
        Label: {
            flex: {
                grow: 1,
                shrink: 1,
            },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
        },
        Shortcut: {
            font: {
                size: '0.75rem',
            },
            color: $mol_theme.shade,
            padding: { top: 0, bottom: 0, left: '1rem', right: 0 },
            whiteSpace: 'nowrap',
        },
        '@': {
            bog_ui_command_item_active: {
                true: {
                    background: {
                        color: $mol_theme.current,
                    },
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_badge) = class $bog_ui_badge extends ($.$mol_view) {
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.label())]);
			return obj;
		}
		label(){
			return "";
		}
		type(){
			return "default";
		}
		sub(){
			return [(this.Label())];
		}
		attr(){
			return {"bog_ui_badge_type": (this.type())};
		}
	};
	($mol_mem(($.$bog_ui_badge.prototype), "Label"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_badge, {
        display: 'inline-flex',
        align: {
            items: 'center',
        },
        padding: {
            top: '.125rem',
            bottom: '.125rem',
            left: '.5rem',
            right: '.5rem',
        },
        borderRadius: '9999px',
        border: {
            color: $mol_theme.line,
            style: 'solid',
            width: '1px',
        },
        font: {
            size: '.75rem',
            weight: 500,
        },
        lineHeight: '1rem',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        overflow: 'hidden',
        background: {
            color: $mol_theme.card,
        },
        color: $mol_theme.text,
        Label: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        '@': {
            bog_ui_badge_type: {
                success: {
                    background: {
                        color: '#22c55e1a',
                    },
                    color: '#16a34a',
                    border: {
                        color: '#22c55e33',
                        style: 'solid',
                        width: '1px',
                    },
                },
                warning: {
                    background: {
                        color: '#eab3081a',
                    },
                    color: '#ca8a04',
                    border: {
                        color: '#eab30833',
                        style: 'solid',
                        width: '1px',
                    },
                },
                error: {
                    background: {
                        color: '#ef44441a',
                    },
                    color: '#dc2626',
                    border: {
                        color: '#ef444433',
                        style: 'solid',
                        width: '1px',
                    },
                },
                info: {
                    background: {
                        color: '#3b82f61a',
                    },
                    color: '#2563eb',
                    border: {
                        color: '#3b82f633',
                        style: 'solid',
                        width: '1px',
                    },
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_badge) = class $bog_ui_app_badge extends ($.$mol_page) {
		description(){
			return "Compact label component with 5 color variants for status indication.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		variants_title(){
			return "Variants";
		}
		Variants_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.variants_title())]);
			return obj;
		}
		Default_badge(){
			const obj = new this.$.$bog_ui_badge();
			(obj.label) = () => ("Default");
			(obj.type) = () => ("default");
			return obj;
		}
		Success_badge(){
			const obj = new this.$.$bog_ui_badge();
			(obj.label) = () => ("Success");
			(obj.type) = () => ("success");
			return obj;
		}
		Warning_badge(){
			const obj = new this.$.$bog_ui_badge();
			(obj.label) = () => ("Warning");
			(obj.type) = () => ("warning");
			return obj;
		}
		Error_badge(){
			const obj = new this.$.$bog_ui_badge();
			(obj.label) = () => ("Error");
			(obj.type) = () => ("error");
			return obj;
		}
		Info_badge(){
			const obj = new this.$.$bog_ui_badge();
			(obj.label) = () => ("Info");
			(obj.type) = () => ("info");
			return obj;
		}
		Variants(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Default_badge()), 
				(this.Success_badge()), 
				(this.Warning_badge()), 
				(this.Error_badge()), 
				(this.Info_badge())
			]);
			return obj;
		}
		title(){
			return "Badge";
		}
		body(){
			return [
				(this.Description()), 
				(this.Variants_title()), 
				(this.Variants())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_badge.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_badge.prototype), "Variants_title"));
	($mol_mem(($.$bog_ui_app_badge.prototype), "Default_badge"));
	($mol_mem(($.$bog_ui_app_badge.prototype), "Success_badge"));
	($mol_mem(($.$bog_ui_app_badge.prototype), "Warning_badge"));
	($mol_mem(($.$bog_ui_app_badge.prototype), "Error_badge"));
	($mol_mem(($.$bog_ui_app_badge.prototype), "Info_badge"));
	($mol_mem(($.$bog_ui_app_badge.prototype), "Variants"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_badge, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Variants_title: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '.5rem',
                bottom: '.75rem',
            },
        },
        Variants: {
            flex: {
                wrap: 'wrap',
            },
            gap: '.75rem',
            align: {
                items: 'center',
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_icon_magnify) = class $mol_icon_magnify extends ($.$mol_icon) {
		path(){
			return "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
		}
	};


;
"use strict";


;
	($.$bog_ui_empty) = class $bog_ui_empty extends ($.$mol_view) {
		Icon(){
			const obj = new this.$.$mol_icon_magnify();
			return obj;
		}
		title(){
			return "Nothing found";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		message(){
			return "Try adjusting your search or filters";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.message())]);
			return obj;
		}
		Action(){
			return null;
		}
		sub(){
			return [
				(this.Icon()), 
				(this.Title()), 
				(this.Message()), 
				(this.Action())
			];
		}
	};
	($mol_mem(($.$bog_ui_empty.prototype), "Icon"));
	($mol_mem(($.$bog_ui_empty.prototype), "Title"));
	($mol_mem(($.$bog_ui_empty.prototype), "Message"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/empty/empty.view.css", "[bog_ui_empty] {\n\tpadding: clamp(1rem, 5%, 3rem);\n}\n\n[bog_ui_empty] > [bog_ui_empty_icon] {\n\tfont-size: clamp(2rem, 8vw, 4rem);\n}\n\n[bog_ui_empty] > [bog_ui_empty_message] {\n\tmax-width: min(100%, 400px);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_empty, {
        display: 'flex',
        flex: {
            direction: 'column',
        },
        align: {
            items: 'center',
        },
        justify: {
            content: 'center',
        },
        width: '100%',
        height: '100%',
        gap: '1rem',
        padding: {
            top: '2rem',
            bottom: '2rem',
            left: '2rem',
            right: '2rem',
        },
        boxSizing: 'border-box',
        Icon: {
            color: $mol_theme.shade,
        },
        Title: {
            font: {
                weight: 'bold',
                size: '1.125rem',
            },
            color: $mol_theme.text,
        },
        Message: {
            color: $mol_theme.shade,
            font: {
                size: '.875rem',
            },
            textAlign: 'center',
        },
    });
})($ || ($ = {}));

;
	($.$mol_icon_folder) = class $mol_icon_folder extends ($.$mol_icon) {
		path(){
			return "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_plus) = class $mol_icon_plus extends ($.$mol_icon) {
		path(){
			return "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_plus_circle) = class $mol_icon_plus_circle extends ($.$mol_icon) {
		path(){
			return "M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
		}
	};


;
"use strict";


;
	($.$mol_button_major) = class $mol_button_major extends ($.$mol_button_minor) {
		theme(){
			return "$mol_theme_base";
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/major/major.view.css", "[mol_button_major] {\n\tbackground-color: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$bog_ui_app_empty) = class $bog_ui_app_empty extends ($.$mol_page) {
		description(){
			return "Placeholder component for empty pages with icon, title, message, and optional action button.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		section_default_title(){
			return "Default";
		}
		Section_default(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.section_default_title())]);
			return obj;
		}
		Default(){
			const obj = new this.$.$bog_ui_empty();
			return obj;
		}
		section_custom_title(){
			return "Custom Icon";
		}
		Section_custom(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.section_custom_title())]);
			return obj;
		}
		Custom_icon_icon(){
			const obj = new this.$.$mol_icon_folder();
			return obj;
		}
		Custom_icon(){
			const obj = new this.$.$bog_ui_empty();
			(obj.Icon) = () => ((this.Custom_icon_icon()));
			(obj.title) = () => ("No documents");
			(obj.message) = () => ("Upload your first document to get started");
			return obj;
		}
		section_action_title(){
			return "With Action Button";
		}
		Section_action(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.section_action_title())]);
			return obj;
		}
		Action_icon(){
			const obj = new this.$.$mol_icon_plus_circle();
			return obj;
		}
		action_label(){
			return "Create Item";
		}
		Action_button(){
			const obj = new this.$.$mol_button_major();
			(obj.sub) = () => ([(this.action_label())]);
			return obj;
		}
		With_action(){
			const obj = new this.$.$bog_ui_empty();
			(obj.Icon) = () => ((this.Action_icon()));
			(obj.title) = () => ("No items yet");
			(obj.message) = () => ("Create your first item to begin");
			(obj.Action) = () => ((this.Action_button()));
			return obj;
		}
		title(){
			return "Empty State";
		}
		body(){
			return [
				(this.Description()), 
				(this.Section_default()), 
				(this.Default()), 
				(this.Section_custom()), 
				(this.Custom_icon()), 
				(this.Section_action()), 
				(this.With_action())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_empty.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "Section_default"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "Default"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "Section_custom"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "Custom_icon_icon"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "Custom_icon"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "Section_action"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "Action_icon"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "Action_button"));
	($mol_mem(($.$bog_ui_app_empty.prototype), "With_action"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_empty, {
        padding: $mol_gap.block,
        gap: '1.5rem',
        Description: {
            color: $mol_theme.shade,
        },
        Section_default: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
        },
        Section_custom: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
        },
        Section_action: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_skeleton) = class $bog_ui_skeleton extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/skeleton/skeleton.view.css", "@keyframes bog_ui_skeleton_shimmer {\n\t0% {\n\t\tbackground-position: -200% 0;\n\t}\n\t100% {\n\t\tbackground-position: 200% 0;\n\t}\n}\n\n[bog_ui_skeleton] {\n\tbackground-image: linear-gradient(90deg, transparent 0%, #ffffff22 50%, transparent 100%);\n\tbackground-size: 200% 100%;\n\tanimation: bog_ui_skeleton_shimmer 1.5s ease-in-out infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_skeleton, {
        height: '1rem',
        minHeight: '0.25rem',
        maxHeight: '4rem',
        width: '100%',
        borderRadius: '0.5rem',
        background: {
            color: $mol_theme.card,
        },
        flex: {
            shrink: 0,
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_skeleton) = class $bog_ui_app_skeleton extends ($.$mol_page) {
		description(){
			return "Loading placeholder with shimmer animation. Use to indicate content is being loaded.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		section_single_title(){
			return "Single Line";
		}
		Section_single(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.section_single_title())]);
			return obj;
		}
		Single(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		section_card_title(){
			return "Card Placeholder";
		}
		Section_card(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.section_card_title())]);
			return obj;
		}
		Card_avatar(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Card_title(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Card_line1(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Card_line2(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Card_short(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Card(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Card_avatar()), 
				(this.Card_title()), 
				(this.Card_line1()), 
				(this.Card_line2()), 
				(this.Card_short())
			]);
			return obj;
		}
		section_sizes_title(){
			return "Different Sizes";
		}
		Section_sizes(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.section_sizes_title())]);
			return obj;
		}
		Size_small(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Size_medium(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Size_large(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Sizes(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Size_small()), 
				(this.Size_medium()), 
				(this.Size_large())
			]);
			return obj;
		}
		title(){
			return "Skeleton";
		}
		body(){
			return [
				(this.Description()), 
				(this.Section_single()), 
				(this.Single()), 
				(this.Section_card()), 
				(this.Card()), 
				(this.Section_sizes()), 
				(this.Sizes())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Section_single"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Single"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Section_card"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Card_avatar"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Card_title"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Card_line1"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Card_line2"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Card_short"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Card"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Section_sizes"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Size_small"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Size_medium"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Size_large"));
	($mol_mem(($.$bog_ui_app_skeleton.prototype), "Sizes"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_skeleton, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Section_single: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '.5rem',
                bottom: '.75rem',
            },
        },
        Section_card: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '1.5rem',
                bottom: '.75rem',
            },
        },
        Card: {
            display: 'flex',
            flex: {
                direction: 'column',
            },
            gap: '.75rem',
            padding: {
                top: '1rem',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
            },
            background: {
                color: $mol_theme.card,
            },
            borderRadius: '0.5rem',
            maxWidth: '100%',
        },
        Card_avatar: {
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
        },
        Card_title: {
            width: '60%',
            height: '1.25rem',
        },
        Card_line1: {
            width: '100%',
        },
        Card_line2: {
            width: '90%',
        },
        Card_short: {
            width: '40%',
        },
        Section_sizes: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '1.5rem',
                bottom: '.75rem',
            },
        },
        Sizes: {
            display: 'flex',
            flex: {
                direction: 'column',
                wrap: 'wrap',
            },
            gap: '.75rem',
        },
        Size_small: {
            height: '.5rem',
        },
        Size_medium: {
            height: '1rem',
        },
        Size_large: {
            height: '2rem',
        },
    });
})($ || ($ = {}));

;
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
		}
		uri_unsafe(){
			return (this.uri_toggle());
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		target(){
			return "_self";
		}
		file_name(){
			return "";
		}
		current(){
			return false;
		}
		relation(){
			return "";
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		click(next){
			return (this.event_click(next));
		}
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		uri_off(){
			return "";
		}
		uri_native(){
			return null;
		}
		external(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri_unsafe()), 
				"title": (this.hint_safe()), 
				"target": (this.target()), 
				"download": (this.file_name()), 
				"mol_link_current": (this.current()), 
				"rel": (this.relation())
			};
		}
		sub(){
			return [(this.title())];
		}
		arg(){
			return {};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$mol_link.prototype), "event_click"));


;
"use strict";
var $;
(function ($) {
    function $mol_dom_safe_uri(uri) {
        return uri.replace(/^(?=\w+script+:)/, 'about:blank#');
    }
    $.$mol_dom_safe_uri = $mol_dom_safe_uri;
    function $mol_dom_safe_attr(val) {
        return val;
    }
    $.$mol_dom_safe_attr = $mol_dom_safe_attr;
    $.$mol_dom_safe_rules = {
        // defaults
        '': { id: $mol_dom_safe_attr },
        // special
        a: { href: $mol_dom_safe_uri },
        img: { src: $mol_dom_safe_uri },
        object: { src: $mol_dom_safe_uri },
        // blocks
        div: {},
        p: {},
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        blockquote: {},
        pre: {},
        ul: {},
        ol: {},
        li: {},
        details: {},
        summary: {},
        hr: {},
        table: {},
        tr: {},
        td: {},
        // inlines
        span: {},
        strong: {},
        em: {},
        br: {},
        ins: {},
        del: {},
        code: {},
    };
    function $mol_dom_safe(nodes) {
        const res = [];
        for (const node of nodes) {
            if (node.nodeType === node.TEXT_NODE) {
                res.push(node);
                continue;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                const kids = this.$mol_dom_safe([...node.childNodes]);
                const allowed = this.$mol_dom_safe_rules[node.localName];
                if (!allowed) {
                    res.push(...kids);
                    continue;
                }
                for (const attr of [...node.attributes]) {
                    const proc = allowed[attr.localName] ?? this.$mol_dom_safe_rules[''][attr.localName];
                    if (proc)
                        attr.nodeValue = proc(attr.nodeValue);
                    else
                        node.removeAttribute(attr.nodeName);
                }
                $mol_dom_render_children(node, kids);
                res.push(node);
                continue;
            }
        }
        return res;
    }
    $.$mol_dom_safe = $mol_dom_safe;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
         */
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    if (error instanceof Error)
                        return '💥' + error.message;
                    return '';
                }
            }
            uri_unsafe() {
                return $mol_dom_safe_uri(super.uri_unsafe());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        minHeight: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
        },
        ':focus-visible': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_breadcrumb) = class $bog_ui_breadcrumb extends ($.$mol_view) {
		last_title(){
			return "";
		}
		items(){
			return [];
		}
		crumbs(){
			return [];
		}
		crumb_title(id){
			return "";
		}
		crumb_uri(id){
			return "";
		}
		Crumb(id){
			const obj = new this.$.$mol_link();
			(obj.title) = () => ((this.crumb_title(id)));
			(obj.uri) = () => ((this.crumb_uri(id)));
			return obj;
		}
		Sep(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["›"]);
			return obj;
		}
		Last(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.last_title())]);
			return obj;
		}
		sub(){
			return (this.items());
		}
	};
	($mol_mem_key(($.$bog_ui_breadcrumb.prototype), "Crumb"));
	($mol_mem_key(($.$bog_ui_breadcrumb.prototype), "Sep"));
	($mol_mem(($.$bog_ui_breadcrumb.prototype), "Last"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_breadcrumb extends $.$bog_ui_breadcrumb {
            items() {
                const crumbs = this.crumbs();
                if (!crumbs.length)
                    return [];
                const items = [];
                for (let i = 0; i < crumbs.length - 1; i++) {
                    items.push(this.Crumb(crumbs[i]));
                    items.push(this.Sep(crumbs[i]));
                }
                items.push(this.Last());
                return items;
            }
            last_title() {
                const crumbs = this.crumbs();
                if (!crumbs.length)
                    return '';
                return this.crumb_title(crumbs[crumbs.length - 1]);
            }
        }
        $$.$bog_ui_breadcrumb = $bog_ui_breadcrumb;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_breadcrumb, {
        display: 'flex',
        flex: {
            direction: 'row',
            wrap: 'nowrap',
            shrink: 1,
        },
        align: {
            items: 'center',
        },
        gap: '.5rem',
        font: {
            size: '.875rem',
        },
        overflow: {
            x: 'auto',
        },
        whiteSpace: 'nowrap',
        minWidth: 0,
        Crumb: {
            flex: {
                shrink: 0,
            },
            whiteSpace: 'nowrap',
        },
        Sep: {
            color: $mol_theme.shade,
            flex: {
                shrink: 0,
            },
            whiteSpace: 'nowrap',
        },
        Last: {
            color: $mol_theme.text,
            font: {
                weight: 500,
            },
            flex: {
                shrink: 0,
            },
            whiteSpace: 'nowrap',
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_breadcrumb) = class $bog_ui_app_breadcrumb extends ($.$mol_page) {
		description(){
			return "Navigation breadcrumbs showing the user's current location in a hierarchy.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		short_title(){
			return "Short Path (2 levels)";
		}
		Short_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.short_title())]);
			return obj;
		}
		short_crumbs(){
			return [];
		}
		Short(){
			const obj = new this.$.$bog_ui_breadcrumb();
			(obj.crumbs) = () => ((this.short_crumbs()));
			return obj;
		}
		long_title(){
			return "Long Path (5 levels)";
		}
		Long_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.long_title())]);
			return obj;
		}
		long_crumbs(){
			return [];
		}
		Long(){
			const obj = new this.$.$bog_ui_breadcrumb();
			(obj.crumbs) = () => ((this.long_crumbs()));
			return obj;
		}
		title(){
			return "Breadcrumb";
		}
		body(){
			return [
				(this.Description()), 
				(this.Short_title()), 
				(this.Short()), 
				(this.Long_title()), 
				(this.Long())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_breadcrumb.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_breadcrumb.prototype), "Short_title"));
	($mol_mem(($.$bog_ui_app_breadcrumb.prototype), "Short"));
	($mol_mem(($.$bog_ui_app_breadcrumb.prototype), "Long_title"));
	($mol_mem(($.$bog_ui_app_breadcrumb.prototype), "Long"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_app_breadcrumb extends $.$bog_ui_app_breadcrumb {
            short_crumbs() {
                return ['home', 'products'];
            }
            long_crumbs() {
                return ['home', 'catalog', 'electronics', 'phones', 'iphone'];
            }
            Short() {
                const short = super.Short();
                short.crumb_title = (id) => {
                    const titles = {
                        home: 'Home',
                        products: 'Products',
                    };
                    return titles[id] ?? id;
                };
                short.crumb_uri = (id) => {
                    return id === 'home' ? '#' : '';
                };
                return short;
            }
            Long() {
                const long = super.Long();
                long.crumb_title = (id) => {
                    const titles = {
                        home: 'Home',
                        catalog: 'Catalog',
                        electronics: 'Electronics',
                        phones: 'Phones',
                        iphone: 'iPhone 15 Pro',
                    };
                    return titles[id] ?? id;
                };
                long.crumb_uri = (id) => {
                    return id === 'iphone' ? '' : '#';
                };
                return long;
            }
        }
        $$.$bog_ui_app_breadcrumb = $bog_ui_app_breadcrumb;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_breadcrumb, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Short_title: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '.5rem',
                bottom: '.75rem',
            },
        },
        Long_title: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '1.5rem',
                bottom: '.75rem',
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_icon_home) = class $mol_icon_home extends ($.$mol_icon) {
		path(){
			return "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_account) = class $mol_icon_account extends ($.$mol_icon) {
		path(){
			return "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_cog) = class $mol_icon_cog extends ($.$mol_icon) {
		path(){
			return "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
		}
	};


;
"use strict";


;
	($.$bog_ui_app_sidebar) = class $bog_ui_app_sidebar extends ($.$mol_page) {
		description(){
			return "Navigation sidebar with 3 display modes: dock (full width with labels), rail (icons only), and hidden (collapsed).";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		mode_title(){
			return "Mode Switching";
		}
		Mode_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.mode_title())]);
			return obj;
		}
		set_dock(next){
			if(next !== undefined) return next;
			return null;
		}
		dock_label(){
			return "Dock";
		}
		Dock_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.set_dock(next)));
			(obj.sub) = () => ([(this.dock_label())]);
			return obj;
		}
		set_rail(next){
			if(next !== undefined) return next;
			return null;
		}
		rail_label(){
			return "Rail";
		}
		Rail_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.set_rail(next)));
			(obj.sub) = () => ([(this.rail_label())]);
			return obj;
		}
		set_hidden(next){
			if(next !== undefined) return next;
			return null;
		}
		hidden_label(){
			return "Hidden";
		}
		Hidden_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.set_hidden(next)));
			(obj.sub) = () => ([(this.hidden_label())]);
			return obj;
		}
		Mode_buttons(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Dock_button()), 
				(this.Rail_button()), 
				(this.Hidden_button())
			]);
			return obj;
		}
		current_mode_text(){
			return "Current mode: dock";
		}
		Current_mode(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.current_mode_text())]);
			return obj;
		}
		preview_mode(next){
			if(next !== undefined) return next;
			return "dock";
		}
		Preview_icon_home(){
			const obj = new this.$.$mol_icon_home();
			return obj;
		}
		Preview_item_home(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Preview_icon_home()));
			(obj.label) = () => ("Home");
			return obj;
		}
		Preview_icon_users(){
			const obj = new this.$.$mol_icon_account();
			return obj;
		}
		Preview_item_users(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Preview_icon_users()));
			(obj.label) = () => ("Users");
			return obj;
		}
		Preview_icon_settings(){
			const obj = new this.$.$mol_icon_cog();
			return obj;
		}
		Preview_item_settings(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Preview_icon_settings()));
			(obj.label) = () => ("Settings");
			return obj;
		}
		Preview_sidebar(){
			const obj = new this.$.$bog_ui_sidebar();
			(obj.mode) = (next) => ((this.preview_mode(next)));
			(obj.items) = () => ([
				(this.Preview_item_home()), 
				(this.Preview_item_users()), 
				(this.Preview_item_settings())
			]);
			return obj;
		}
		preview_content_text(){
			return "Main content area";
		}
		Preview_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.preview_content_text())]);
			return obj;
		}
		Preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Preview_sidebar()), (this.Preview_content())]);
			return obj;
		}
		title(){
			return "Sidebar";
		}
		body(){
			return [
				(this.Description()), 
				(this.Mode_title()), 
				(this.Mode_buttons()), 
				(this.Current_mode()), 
				(this.Preview())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Mode_title"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "set_dock"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Dock_button"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "set_rail"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Rail_button"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "set_hidden"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Hidden_button"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Mode_buttons"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Current_mode"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "preview_mode"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview_icon_home"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview_item_home"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview_icon_users"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview_item_users"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview_icon_settings"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview_item_settings"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview_sidebar"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview_content"));
	($mol_mem(($.$bog_ui_app_sidebar.prototype), "Preview"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_app_sidebar extends $.$bog_ui_app_sidebar {
            set_dock(next) {
                if (next !== undefined)
                    this.preview_mode('dock');
                return null;
            }
            set_rail(next) {
                if (next !== undefined)
                    this.preview_mode('rail');
                return null;
            }
            set_hidden(next) {
                if (next !== undefined)
                    this.preview_mode('hidden');
                return null;
            }
            current_mode_text() {
                return `Current mode: ${this.preview_mode()}`;
            }
        }
        __decorate([
            $mol_action
        ], $bog_ui_app_sidebar.prototype, "set_dock", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_sidebar.prototype, "set_rail", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_sidebar.prototype, "set_hidden", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app_sidebar.prototype, "current_mode_text", null);
        $$.$bog_ui_app_sidebar = $bog_ui_app_sidebar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_sidebar, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Mode_title: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '.5rem',
                bottom: '.75rem',
            },
        },
        Mode_buttons: {
            display: 'flex',
            gap: '.75rem',
            flex: {
                wrap: 'wrap',
            },
            padding: {
                bottom: '.5rem',
            },
        },
        Current_mode: {
            color: $mol_theme.shade,
            font: {
                size: '0.875rem',
            },
            padding: {
                bottom: '1rem',
            },
        },
        Preview: {
            display: 'flex',
            flex: {
                wrap: 'wrap',
            },
            width: '100%',
            boxSizing: 'border-box',
            border: {
                width: '1px',
                style: 'solid',
                color: $mol_theme.line,
            },
            borderRadius: '0.5rem',
            overflow: 'hidden',
            minHeight: '200px',
        },
        Preview_content: {
            flex: {
                grow: 1,
            },
            display: 'flex',
            align: {
                items: 'center',
            },
            justify: {
                content: 'center',
            },
            color: $mol_theme.shade,
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_sheet) = class $bog_ui_sheet extends ($.$mol_view) {
		backdrop_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Backdrop(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({"click": (next) => (this.backdrop_click(next))});
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
		Panel(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Content())]);
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		side(){
			return "right";
		}
		content(){
			return [];
		}
		sub(){
			return [(this.Backdrop()), (this.Panel())];
		}
		attr(){
			return {"bog_ui_sheet_showed": (this.showed()), "bog_ui_sheet_side": (this.side())};
		}
	};
	($mol_mem(($.$bog_ui_sheet.prototype), "backdrop_click"));
	($mol_mem(($.$bog_ui_sheet.prototype), "Backdrop"));
	($mol_mem(($.$bog_ui_sheet.prototype), "Content"));
	($mol_mem(($.$bog_ui_sheet.prototype), "Panel"));
	($mol_mem(($.$bog_ui_sheet.prototype), "showed"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_sheet extends $.$bog_ui_sheet {
            backdrop_click(next) {
                if (next !== undefined) {
                    this.showed(false);
                }
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $bog_ui_sheet.prototype, "backdrop_click", null);
        $$.$bog_ui_sheet = $bog_ui_sheet;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/sheet/sheet.view.css", "[bog_ui_sheet] {\n\tvisibility: hidden;\n}\n\n[bog_ui_sheet_showed=\"true\"] {\n\tvisibility: visible;\n}\n\n[bog_ui_sheet] [bog_ui_sheet=\"Backdrop\"] {\n\ttransition: background-color 0.3s ease;\n}\n\n[bog_ui_sheet] [bog_ui_sheet=\"Panel\"] {\n\ttransition: transform 0.3s ease;\n}\n\n/* Right side */\n[bog_ui_sheet_side=\"right\"] [bog_ui_sheet=\"Panel\"] {\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\twidth: clamp(280px, 80%, 480px);\n\ttransform: translateX(100%);\n}\n\n[bog_ui_sheet_showed=\"true\"][bog_ui_sheet_side=\"right\"] [bog_ui_sheet=\"Panel\"] {\n\ttransform: translateX(0);\n}\n\n/* Left side */\n[bog_ui_sheet_side=\"left\"] [bog_ui_sheet=\"Panel\"] {\n\ttop: 0;\n\tleft: 0;\n\tbottom: 0;\n\twidth: clamp(280px, 80%, 480px);\n\ttransform: translateX(-100%);\n}\n\n[bog_ui_sheet_showed=\"true\"][bog_ui_sheet_side=\"left\"] [bog_ui_sheet=\"Panel\"] {\n\ttransform: translateX(0);\n}\n\n/* Top side */\n[bog_ui_sheet_side=\"top\"] [bog_ui_sheet=\"Panel\"] {\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\theight: clamp(200px, 50vh, 70vh);\n\ttransform: translateY(-100%);\n}\n\n[bog_ui_sheet_showed=\"true\"][bog_ui_sheet_side=\"top\"] [bog_ui_sheet=\"Panel\"] {\n\ttransform: translateY(0);\n}\n\n/* Bottom side */\n[bog_ui_sheet_side=\"bottom\"] [bog_ui_sheet=\"Panel\"] {\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\theight: clamp(200px, 50vh, 70vh);\n\ttransform: translateY(100%);\n}\n\n[bog_ui_sheet_showed=\"true\"][bog_ui_sheet_side=\"bottom\"] [bog_ui_sheet=\"Panel\"] {\n\ttransform: translateY(0);\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_sheet, {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        Backdrop: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
                color: '#00000000',
            },
            pointerEvents: 'none',
        },
        Panel: {
            position: 'absolute',
            background: {
                color: $mol_theme.back,
            },
            overflow: {
                y: 'auto',
                x: 'hidden',
            },
            pointerEvents: 'auto',
            boxShadow: '0 0 24px #00000033',
        },
        '@': {
            bog_ui_sheet_showed: {
                true: {
                    pointerEvents: 'auto',
                    Backdrop: {
                        pointerEvents: 'auto',
                        background: {
                            color: '#00000066',
                        },
                    },
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_sheet) = class $bog_ui_app_sheet extends ($.$mol_page) {
		description(){
			return "Overlay panel that slides in from any edge of the screen. Click a button to open a Sheet from the corresponding side.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		buttons_title(){
			return "Open from side";
		}
		Buttons_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.buttons_title())]);
			return obj;
		}
		open_top(next){
			if(next !== undefined) return next;
			return null;
		}
		top_label(){
			return "Top";
		}
		Top_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.open_top(next)));
			(obj.sub) = () => ([(this.top_label())]);
			return obj;
		}
		open_right(next){
			if(next !== undefined) return next;
			return null;
		}
		right_label(){
			return "Right";
		}
		Right_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.open_right(next)));
			(obj.sub) = () => ([(this.right_label())]);
			return obj;
		}
		open_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		bottom_label(){
			return "Bottom";
		}
		Bottom_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.open_bottom(next)));
			(obj.sub) = () => ([(this.bottom_label())]);
			return obj;
		}
		open_left(next){
			if(next !== undefined) return next;
			return null;
		}
		left_label(){
			return "Left";
		}
		Left_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.open_left(next)));
			(obj.sub) = () => ([(this.left_label())]);
			return obj;
		}
		Buttons(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Top_button()), 
				(this.Right_button()), 
				(this.Bottom_button()), 
				(this.Left_button())
			]);
			return obj;
		}
		top_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		top_heading(){
			return "Sheet from Top";
		}
		Top_heading(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.top_heading())]);
			return obj;
		}
		top_text(){
			return "This sheet slides in from the top edge. It can be used for notifications, search bars, or any content that should appear from above.";
		}
		Top_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.top_text())]);
			return obj;
		}
		Top_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Top_heading()), (this.Top_text())]);
			return obj;
		}
		Sheet_top(){
			const obj = new this.$.$bog_ui_sheet();
			(obj.showed) = (next) => ((this.top_showed(next)));
			(obj.side) = () => ("top");
			(obj.content) = () => ([(this.Top_content())]);
			return obj;
		}
		right_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		right_heading(){
			return "Sheet from Right";
		}
		Right_heading(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.right_heading())]);
			return obj;
		}
		right_text(){
			return "This sheet slides in from the right edge. Commonly used for detail panels, settings, or secondary navigation.";
		}
		Right_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.right_text())]);
			return obj;
		}
		right_form_title(){
			return "Example Form";
		}
		Right_form_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.right_form_title())]);
			return obj;
		}
		right_name(next){
			if(next !== undefined) return next;
			return "";
		}
		Right_name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Your name");
			(obj.value) = (next) => ((this.right_name(next)));
			return obj;
		}
		right_email(next){
			if(next !== undefined) return next;
			return "";
		}
		Right_email(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Email address");
			(obj.value) = (next) => ((this.right_email(next)));
			return obj;
		}
		Right_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Right_heading()), 
				(this.Right_text()), 
				(this.Right_form_title()), 
				(this.Right_name()), 
				(this.Right_email())
			]);
			return obj;
		}
		Sheet_right(){
			const obj = new this.$.$bog_ui_sheet();
			(obj.showed) = (next) => ((this.right_showed(next)));
			(obj.side) = () => ("right");
			(obj.content) = () => ([(this.Right_content())]);
			return obj;
		}
		bottom_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		bottom_heading(){
			return "Sheet from Bottom";
		}
		Bottom_heading(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.bottom_heading())]);
			return obj;
		}
		bottom_text(){
			return "This sheet slides in from the bottom edge. Often used for mobile action sheets, media players, or supplementary content.";
		}
		Bottom_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.bottom_text())]);
			return obj;
		}
		Bottom_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Bottom_heading()), (this.Bottom_text())]);
			return obj;
		}
		Sheet_bottom(){
			const obj = new this.$.$bog_ui_sheet();
			(obj.showed) = (next) => ((this.bottom_showed(next)));
			(obj.side) = () => ("bottom");
			(obj.content) = () => ([(this.Bottom_content())]);
			return obj;
		}
		left_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		left_heading(){
			return "Sheet from Left";
		}
		Left_heading(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.left_heading())]);
			return obj;
		}
		left_text(){
			return "This sheet slides in from the left edge. Useful for navigation drawers, filters, or side panels.";
		}
		Left_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.left_text())]);
			return obj;
		}
		Left_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Left_heading()), (this.Left_text())]);
			return obj;
		}
		Sheet_left(){
			const obj = new this.$.$bog_ui_sheet();
			(obj.showed) = (next) => ((this.left_showed(next)));
			(obj.side) = () => ("left");
			(obj.content) = () => ([(this.Left_content())]);
			return obj;
		}
		title(){
			return "Sheet / Drawer";
		}
		body(){
			return [
				(this.Description()), 
				(this.Buttons_title()), 
				(this.Buttons()), 
				(this.Sheet_top()), 
				(this.Sheet_right()), 
				(this.Sheet_bottom()), 
				(this.Sheet_left())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Buttons_title"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "open_top"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Top_button"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "open_right"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Right_button"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "open_bottom"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Bottom_button"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "open_left"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Left_button"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Buttons"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "top_showed"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Top_heading"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Top_text"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Top_content"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Sheet_top"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "right_showed"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Right_heading"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Right_text"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Right_form_title"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "right_name"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Right_name"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "right_email"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Right_email"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Right_content"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Sheet_right"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "bottom_showed"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Bottom_heading"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Bottom_text"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Bottom_content"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Sheet_bottom"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "left_showed"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Left_heading"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Left_text"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Left_content"));
	($mol_mem(($.$bog_ui_app_sheet.prototype), "Sheet_left"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_app_sheet extends $.$bog_ui_app_sheet {
            open_top(next) {
                if (next !== undefined)
                    this.top_showed(true);
                return null;
            }
            open_right(next) {
                if (next !== undefined)
                    this.right_showed(true);
                return null;
            }
            open_bottom(next) {
                if (next !== undefined)
                    this.bottom_showed(true);
                return null;
            }
            open_left(next) {
                if (next !== undefined)
                    this.left_showed(true);
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $bog_ui_app_sheet.prototype, "open_top", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_sheet.prototype, "open_right", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_sheet.prototype, "open_bottom", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_sheet.prototype, "open_left", null);
        $$.$bog_ui_app_sheet = $bog_ui_app_sheet;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_sheet, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Buttons_title: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '.5rem',
                bottom: '.75rem',
            },
        },
        Buttons: {
            display: 'flex',
            gap: '.75rem',
            flex: {
                wrap: 'wrap',
            },
            padding: {
                bottom: '1rem',
            },
        },
        Top_content: {
            padding: $mol_gap.block,
        },
        Right_content: {
            padding: $mol_gap.block,
        },
        Bottom_content: {
            padding: $mol_gap.block,
        },
        Left_content: {
            padding: $mol_gap.block,
        },
        Top_heading: {
            font: {
                size: '1.25rem',
                weight: 'bold',
            },
            padding: {
                bottom: '.5rem',
            },
        },
        Right_heading: {
            font: {
                size: '1.25rem',
                weight: 'bold',
            },
            padding: {
                bottom: '.5rem',
            },
        },
        Bottom_heading: {
            font: {
                size: '1.25rem',
                weight: 'bold',
            },
            padding: {
                bottom: '.5rem',
            },
        },
        Left_heading: {
            font: {
                size: '1.25rem',
                weight: 'bold',
            },
            padding: {
                bottom: '.5rem',
            },
        },
        Top_text: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Right_text: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Bottom_text: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Left_text: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Right_form_title: {
            font: {
                weight: 'bold',
            },
            padding: {
                bottom: '.5rem',
            },
        },
        Right_name: {
            padding: {
                bottom: '.5rem',
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_icon_information) = class $mol_icon_information extends ($.$mol_icon) {
		path(){
			return "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_close) = class $mol_icon_close extends ($.$mol_icon) {
		path(){
			return "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
		}
	};


;
"use strict";


;
	($.$bog_ui_toast) = class $bog_ui_toast extends ($.$mol_view) {
		Icon(){
			const obj = new this.$.$mol_icon_information();
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.message())]);
			return obj;
		}
		Close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Close(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.close(next)));
			(obj.sub) = () => ([(this.Close_icon())]);
			return obj;
		}
		message(){
			return "";
		}
		type(){
			return "info";
		}
		closeable(){
			return true;
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		sub(){
			return [
				(this.Icon()), 
				(this.Body()), 
				(this.Close())
			];
		}
		attr(){
			return {"bog_ui_toast_type": (this.type()), "bog_ui_toast_closeable": (this.closeable())};
		}
	};
	($mol_mem(($.$bog_ui_toast.prototype), "Icon"));
	($mol_mem(($.$bog_ui_toast.prototype), "Body"));
	($mol_mem(($.$bog_ui_toast.prototype), "Close_icon"));
	($mol_mem(($.$bog_ui_toast.prototype), "Close"));
	($mol_mem(($.$bog_ui_toast.prototype), "close"));


;
	($.$mol_icon_check) = class $mol_icon_check extends ($.$mol_icon) {
		path(){
			return "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_check_circle) = class $mol_icon_check_circle extends ($.$mol_icon) {
		path(){
			return "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_alert) = class $mol_icon_alert extends ($.$mol_icon) {
		path(){
			return "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_alert_circle) = class $mol_icon_alert_circle extends ($.$mol_icon) {
		path(){
			return "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
		}
	};


;
"use strict";


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_toast extends $.$bog_ui_toast {
            Icon() {
                switch (this.type()) {
                    case 'success': return new this.$.$mol_icon_check_circle();
                    case 'warning': return new this.$.$mol_icon_alert();
                    case 'error': return new this.$.$mol_icon_alert_circle();
                    default: return new this.$.$mol_icon_information();
                }
            }
        }
        __decorate([
            $mol_mem
        ], $bog_ui_toast.prototype, "Icon", null);
        $$.$bog_ui_toast = $bog_ui_toast;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/toast/toast.view.css", "@keyframes bog_ui_toast_slide_in {\n\tfrom {\n\t\ttransform: translateX(100%);\n\t\topacity: 0;\n\t}\n\tto {\n\t\ttransform: translateX(0);\n\t\topacity: 1;\n\t}\n}\n\n[bog_ui_toast] {\n\tanimation: bog_ui_toast_slide_in 0.3s ease-out;\n}\n\n[bog_ui_toast_closeable=\"false\"] [bog_ui_toast=\"Close\"] {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_toast, {
        display: 'flex',
        align: {
            items: 'center',
        },
        gap: '.75rem',
        padding: {
            top: '.75rem',
            bottom: '.75rem',
            left: '1rem',
            right: '1rem',
        },
        borderRadius: '0.5rem',
        background: {
            color: $mol_theme.card,
        },
        color: $mol_theme.text,
        border: {
            style: 'solid',
            width: '1px',
            color: $mol_theme.line,
        },
        box: {
            shadow: [{
                    x: 0,
                    y: '4px',
                    blur: '12px',
                    spread: 0,
                    color: '#0000001a',
                }],
        },
        Icon: {
            font: {
                size: '1.25rem',
            },
            flex: {
                shrink: 0,
            },
        },
        Body: {
            flex: {
                grow: 1,
                shrink: 1,
            },
            font: {
                size: '.875rem',
            },
            overflow: 'hidden',
            overflowWrap: 'break-word',
            minWidth: 0,
        },
        Close: {
            flex: {
                shrink: 0,
            },
        },
        '@': {
            bog_ui_toast_type: {
                info: {
                    background: { color: '#3b82f61a' },
                    color: '#2563eb',
                    border: { color: '#3b82f633', style: 'solid', width: '1px' },
                },
                success: {
                    background: { color: '#22c55e1a' },
                    color: '#16a34a',
                    border: { color: '#22c55e33', style: 'solid', width: '1px' },
                },
                warning: {
                    background: { color: '#eab3081a' },
                    color: '#ca8a04',
                    border: { color: '#eab30833', style: 'solid', width: '1px' },
                },
                error: {
                    background: { color: '#ef44441a' },
                    color: '#dc2626',
                    border: { color: '#ef444433', style: 'solid', width: '1px' },
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_toast_manager) = class $bog_ui_toast_manager extends ($.$mol_view) {
		toast_message(id){
			return "";
		}
		toast_type(id){
			return "info";
		}
		toast_close(id, next){
			if(next !== undefined) return next;
			return null;
		}
		toast_views(){
			return [];
		}
		toast_data(){
			return [];
		}
		Toast(id){
			const obj = new this.$.$bog_ui_toast();
			(obj.message) = () => ((this.toast_message(id)));
			(obj.type) = () => ((this.toast_type(id)));
			(obj.close) = (next) => ((this.toast_close(id, next)));
			return obj;
		}
		sub(){
			return (this.toast_views());
		}
	};
	($mol_mem_key(($.$bog_ui_toast_manager.prototype), "toast_close"));
	($mol_mem_key(($.$bog_ui_toast_manager.prototype), "Toast"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_toast_manager extends $.$bog_ui_toast_manager {
            toast_data(next) {
                return next ?? [];
            }
            add(message, type = 'info') {
                const id = String(Date.now()) + String(Math.random()).slice(2, 8);
                const data = this.toast_data();
                this.toast_data([...data, { id, message, type }]);
            }
            remove(id) {
                this.toast_data(this.toast_data().filter(t => t.id !== id));
            }
            toast_views() {
                return this.toast_data().slice(-5).map(t => this.Toast(t.id));
            }
            toast_message(id) {
                return this.toast_data().find(t => t.id === id)?.message ?? '';
            }
            toast_type(id) {
                return this.toast_data().find(t => t.id === id)?.type ?? 'info';
            }
            toast_close(id, next) {
                if (next !== undefined) {
                    this.remove(id);
                }
                return null;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_ui_toast_manager.prototype, "toast_data", null);
        __decorate([
            $mol_mem_key
        ], $bog_ui_toast_manager.prototype, "toast_close", null);
        $$.$bog_ui_toast_manager = $bog_ui_toast_manager;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/toast/manager/manager.view.css", "[bog_ui_toast_manager] {\n\twidth: clamp(250px, 90vw, 420px);\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_toast_manager, {
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        display: 'flex',
        flex: {
            direction: 'column',
        },
        gap: '.5rem',
        zIndex: 9999,
        maxHeight: '100vh',
        pointerEvents: 'none',
        Toast: {
            pointerEvents: 'auto',
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_toast) = class $bog_ui_app_toast extends ($.$mol_page) {
		description(){
			return "Toast notifications for user feedback. Click a button to trigger a toast of the corresponding type. Toasts stack vertically and close via the × button.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		buttons_title(){
			return "Trigger toasts";
		}
		Buttons_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.buttons_title())]);
			return obj;
		}
		add_info(next){
			if(next !== undefined) return next;
			return null;
		}
		info_label(){
			return "Info";
		}
		Info_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.add_info(next)));
			(obj.sub) = () => ([(this.info_label())]);
			return obj;
		}
		add_success(next){
			if(next !== undefined) return next;
			return null;
		}
		success_label(){
			return "Success";
		}
		Success_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.add_success(next)));
			(obj.sub) = () => ([(this.success_label())]);
			return obj;
		}
		add_warning(next){
			if(next !== undefined) return next;
			return null;
		}
		warning_label(){
			return "Warning";
		}
		Warning_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.add_warning(next)));
			(obj.sub) = () => ([(this.warning_label())]);
			return obj;
		}
		add_error(next){
			if(next !== undefined) return next;
			return null;
		}
		error_label(){
			return "Error";
		}
		Error_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.add_error(next)));
			(obj.sub) = () => ([(this.error_label())]);
			return obj;
		}
		Buttons(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Info_button()), 
				(this.Success_button()), 
				(this.Warning_button()), 
				(this.Error_button())
			]);
			return obj;
		}
		Manager(){
			const obj = new this.$.$bog_ui_toast_manager();
			return obj;
		}
		title(){
			return "Toast";
		}
		body(){
			return [
				(this.Description()), 
				(this.Buttons_title()), 
				(this.Buttons()), 
				(this.Manager())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_toast.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "Buttons_title"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "add_info"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "Info_button"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "add_success"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "Success_button"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "add_warning"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "Warning_button"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "add_error"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "Error_button"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "Buttons"));
	($mol_mem(($.$bog_ui_app_toast.prototype), "Manager"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_app_toast extends $.$bog_ui_app_toast {
            add_info(next) {
                if (next !== undefined) {
                    const m = this.Manager();
                    m.add('This is an informational message.', 'info');
                }
                return null;
            }
            add_success(next) {
                if (next !== undefined) {
                    const m = this.Manager();
                    m.add('Operation completed successfully!', 'success');
                }
                return null;
            }
            add_warning(next) {
                if (next !== undefined) {
                    const m = this.Manager();
                    m.add('Please check your input carefully.', 'warning');
                }
                return null;
            }
            add_error(next) {
                if (next !== undefined) {
                    const m = this.Manager();
                    m.add('Something went wrong. Try again.', 'error');
                }
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $bog_ui_app_toast.prototype, "add_info", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_toast.prototype, "add_success", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_toast.prototype, "add_warning", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_toast.prototype, "add_error", null);
        $$.$bog_ui_app_toast = $bog_ui_app_toast;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_toast, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Buttons_title: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '.5rem',
                bottom: '.75rem',
            },
        },
        Buttons: {
            display: 'flex',
            gap: '.75rem',
            flex: {
                wrap: 'wrap',
            },
            padding: {
                bottom: '1rem',
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_command) = class $bog_ui_app_command extends ($.$mol_page) {
		description(){
			return "Command palette for quick search and action execution. Press the button or use ⌘K / Ctrl+K to open. Type to filter commands in real time.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		open_title(){
			return "Open palette";
		}
		Open_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.open_title())]);
			return obj;
		}
		open_palette(next){
			if(next !== undefined) return next;
			return null;
		}
		open_label(){
			return "Open Command Palette";
		}
		Open_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.open_palette(next)));
			(obj.sub) = () => ([(this.open_label())]);
			return obj;
		}
		shortcut_hint(){
			return "⌘K";
		}
		Shortcut_hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.shortcut_hint())]);
			return obj;
		}
		Open_row(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Open_button()), (this.Shortcut_hint())]);
			return obj;
		}
		groups_title(){
			return "Demo commands";
		}
		Groups_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.groups_title())]);
			return obj;
		}
		groups_desc(){
			return "The palette contains 3 groups: Navigation, Actions, and Settings. Use the search field to filter by command name.";
		}
		Groups_desc(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.groups_desc())]);
			return obj;
		}
		palette_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		Nav_group(){
			const obj = new this.$.$bog_ui_command_group();
			(obj.title) = () => ("Navigation");
			return obj;
		}
		Nav_home(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Go to Home");
			(obj.shortcut) = () => ("⌘H");
			return obj;
		}
		Nav_dashboard(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Go to Dashboard");
			(obj.shortcut) = () => ("⌘D");
			return obj;
		}
		Nav_settings(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Go to Settings");
			(obj.shortcut) = () => ("⌘,");
			return obj;
		}
		Nav_profile(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Go to Profile");
			return obj;
		}
		Actions_group(){
			const obj = new this.$.$bog_ui_command_group();
			(obj.title) = () => ("Actions");
			return obj;
		}
		Actions_new(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Create New Item");
			(obj.shortcut) = () => ("⌘N");
			return obj;
		}
		Actions_save(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Save Current");
			(obj.shortcut) = () => ("⌘S");
			return obj;
		}
		Actions_export(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Export as PDF");
			(obj.shortcut) = () => ("⌘⇧E");
			return obj;
		}
		Settings_group(){
			const obj = new this.$.$bog_ui_command_group();
			(obj.title) = () => ("Settings");
			return obj;
		}
		Settings_theme(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Toggle Dark Mode");
			(obj.shortcut) = () => ("⌘⇧T");
			return obj;
		}
		Settings_lang(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Change Language");
			return obj;
		}
		Settings_notifications(){
			const obj = new this.$.$bog_ui_command_item();
			(obj.label) = () => ("Notification Settings");
			return obj;
		}
		demo_commands(){
			return [
				(this.Nav_group()), 
				(this.Nav_home()), 
				(this.Nav_dashboard()), 
				(this.Nav_settings()), 
				(this.Nav_profile()), 
				(this.Actions_group()), 
				(this.Actions_new()), 
				(this.Actions_save()), 
				(this.Actions_export()), 
				(this.Settings_group()), 
				(this.Settings_theme()), 
				(this.Settings_lang()), 
				(this.Settings_notifications())
			];
		}
		Palette(){
			const obj = new this.$.$bog_ui_command();
			(obj.showed) = (next) => ((this.palette_showed(next)));
			(obj.commands) = () => ((this.demo_commands()));
			return obj;
		}
		title(){
			return "Command Palette";
		}
		body(){
			return [
				(this.Description()), 
				(this.Open_title()), 
				(this.Open_row()), 
				(this.Groups_title()), 
				(this.Groups_desc()), 
				(this.Palette())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_command.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Open_title"));
	($mol_mem(($.$bog_ui_app_command.prototype), "open_palette"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Open_button"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Shortcut_hint"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Open_row"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Groups_title"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Groups_desc"));
	($mol_mem(($.$bog_ui_app_command.prototype), "palette_showed"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Nav_group"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Nav_home"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Nav_dashboard"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Nav_settings"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Nav_profile"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Actions_group"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Actions_new"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Actions_save"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Actions_export"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Settings_group"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Settings_theme"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Settings_lang"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Settings_notifications"));
	($mol_mem(($.$bog_ui_app_command.prototype), "Palette"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_app_command extends $.$bog_ui_app_command {
            open_palette(next) {
                if (next !== undefined) {
                    this.palette_showed(true);
                }
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $bog_ui_app_command.prototype, "open_palette", null);
        $$.$bog_ui_app_command = $bog_ui_app_command;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_command, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Open_title: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '.5rem',
                bottom: '.75rem',
            },
        },
        Open_row: {
            display: 'flex',
            gap: '.75rem',
            flex: {
                wrap: 'wrap',
            },
            align: {
                items: 'center',
            },
            padding: {
                bottom: '1.5rem',
            },
        },
        Shortcut_hint: {
            color: $mol_theme.shade,
            font: {
                size: '0.875rem',
            },
        },
        Groups_title: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                bottom: '.75rem',
            },
        },
        Groups_desc: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_paragraph) = class $mol_paragraph extends ($.$mol_view) {
		line_height(){
			return 24;
		}
		letter_width(){
			return 7;
		}
		width_limit(){
			return +Infinity;
		}
		row_width(){
			return 0;
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
	($.$mol_dimmer) = class $mol_dimmer extends ($.$mol_paragraph) {
		parts(){
			return [];
		}
		string(id){
			return "";
		}
		haystack(){
			return "";
		}
		needle(){
			return "";
		}
		sub(){
			return (this.parts());
		}
		Low(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
		High(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_dimmer.prototype), "Low"));
	($mol_mem_key(($.$mol_dimmer.prototype), "High"));


;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    let x = /x/[Symbol.matchAll];
    /** Type safe reguar expression builder */
    class $mol_regexp extends RegExp {
        groups;
        /** Prefer to use $mol_regexp.from */
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        /** Parses input and returns found capture groups or null */
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        /** Splits string by regexp edges */
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        /** Makes regexp that greedy repeats this pattern with delimiter */
        static separated(chunk, sep) {
            return $mol_regexp.from([
                $mol_regexp.repeat_greedy([[chunk], sep], 0),
                chunk,
            ]);
        }
        /** Makes regexp that non-greedy repeats this pattern from min to max count */
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that greedy repeats this pattern from min to max count */
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that match any of options */
        static vary(sources, flags = 'gsu') {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
        }
        /** Makes regexp that allow absent of this pattern */
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        /** Makes regexp that look ahead for pattern */
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Makes regexp that look ahead for pattern */
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Converts some js values to regexp */
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        /** Makes regexp which includes only unicode category */
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        /** Makes regexp which excludes unicode category */
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Output text with dimmed mismatched substrings.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dimmer_demo
         */
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_float) = class $mol_float extends ($.$mol_view) {
		style(){
			return {...(super.style()), "minHeight": "auto"};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: var(--mol_layer_float);\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n\tbackground: linear-gradient( var(--mol_theme_card), var(--mol_theme_card) ), var(--mol_theme_back);\n\tbox-shadow: 0 0 .5rem hsla(0,0%,0%,.25);\n}\n\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_chevron) = class $mol_icon_chevron extends ($.$mol_icon) {
		path(){
			return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
		}
	};


;
"use strict";


;
	($.$mol_check_expand) = class $mol_check_expand extends ($.$mol_check) {
		level_style(){
			return "0px";
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return false;
		}
		Icon(){
			const obj = new this.$.$mol_icon_chevron();
			return obj;
		}
		level(){
			return 0;
		}
		style(){
			return {...(super.style()), "paddingLeft": (this.level_style())};
		}
		checked(next){
			return (this.expanded(next));
		}
		enabled(){
			return (this.expandable());
		}
	};
	($mol_mem(($.$mol_check_expand.prototype), "expanded"));
	($mol_mem(($.$mol_check_expand.prototype), "Icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Expander for trees, lists, etc
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_expand_demo
         */
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n\tmin-width: 20px;\n}\n\n:where([mol_check_expand][disabled]) [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n\tmargin-left: -0.375rem;\n}\n[mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n:where([mol_check_checked]) [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-left: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_grid) = class $mol_grid extends ($.$mol_view) {
		rows(){
			return [];
		}
		Table(){
			const obj = new this.$.$mol_grid_table();
			(obj.sub) = () => ((this.rows()));
			return obj;
		}
		head_cells(){
			return [];
		}
		cells(id){
			return [];
		}
		cell_content(id){
			return [];
		}
		cell_content_text(id){
			return (this.cell_content(id));
		}
		cell_content_number(id){
			return (this.cell_content(id));
		}
		col_head_content(id){
			return [];
		}
		cell_level(id){
			return 0;
		}
		cell_expanded(id, next){
			if(next !== undefined) return next;
			return false;
		}
		needle(){
			return "";
		}
		cell_value(id){
			return "";
		}
		Cell_dimmer(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.needle()));
			(obj.haystack) = () => ((this.cell_value(id)));
			return obj;
		}
		row_height(){
			return 32;
		}
		row_ids(){
			return [];
		}
		row_id(id){
			return null;
		}
		col_ids(){
			return [];
		}
		records(){
			return {};
		}
		record(id){
			return null;
		}
		hierarchy(){
			return null;
		}
		hierarchy_col(){
			return "";
		}
		minimal_width(){
			return 0;
		}
		sub(){
			return [(this.Head()), (this.Table())];
		}
		Head(){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.head_cells()));
			return obj;
		}
		Row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.minimal_height) = () => ((this.row_height()));
			(obj.minimal_width) = () => ((this.minimal_width()));
			(obj.cells) = () => ((this.cells(id)));
			return obj;
		}
		Cell(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		cell(id){
			return null;
		}
		Cell_text(id){
			const obj = new this.$.$mol_grid_cell();
			(obj.sub) = () => ((this.cell_content_text(id)));
			return obj;
		}
		Cell_number(id){
			const obj = new this.$.$mol_grid_number();
			(obj.sub) = () => ((this.cell_content_number(id)));
			return obj;
		}
		Col_head(id){
			const obj = new this.$.$mol_float();
			(obj.dom_name) = () => ("th");
			(obj.sub) = () => ((this.col_head_content(id)));
			return obj;
		}
		Cell_branch(id){
			const obj = new this.$.$mol_check_expand();
			(obj.level) = () => ((this.cell_level(id)));
			(obj.label) = () => ((this.cell_content(id)));
			(obj.expanded) = (next) => ((this.cell_expanded(id, next)));
			return obj;
		}
		Cell_content(id){
			return [(this.Cell_dimmer(id))];
		}
	};
	($mol_mem(($.$mol_grid.prototype), "Table"));
	($mol_mem_key(($.$mol_grid.prototype), "cell_expanded"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_dimmer"));
	($mol_mem(($.$mol_grid.prototype), "Head"));
	($mol_mem_key(($.$mol_grid.prototype), "Row"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_text"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_number"));
	($mol_mem_key(($.$mol_grid.prototype), "Col_head"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_branch"));
	($.$mol_grid_table) = class $mol_grid_table extends ($.$mol_list) {};
	($.$mol_grid_row) = class $mol_grid_row extends ($.$mol_view) {
		cells(){
			return [];
		}
		sub(){
			return (this.cells());
		}
	};
	($.$mol_grid_cell) = class $mol_grid_cell extends ($.$mol_view) {
		minimal_height(){
			return 40;
		}
	};
	($.$mol_grid_number) = class $mol_grid_number extends ($.$mol_grid_cell) {};


;
"use strict";
var $;
(function ($) {
    class $mol_state_session extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            cell_content_text(id) {
                return this.cell_content(id).map(val => typeof val === 'object' ? JSON.stringify(val) : val);
            }
            records() {
                return [];
            }
            record(id) {
                return this.records()[id];
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return true;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
            sub() {
                this.head_cells();
                this.rows();
                return super.sub();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/grid/grid.view.css", "[mol_grid] {\n\tdisplay: block;\n\tflex: 0 1 auto;\n\tposition: relative;\n\toverflow-x: auto;\n}\n\n[mol_grid_gap] {\n\tposition: absolute;\n\tpadding: .1px;\n\ttop: 0;\n\ttransform: translateZ(0);\n}\n\n[mol_grid_table] {\n\tborder-spacing: 0;\n\tdisplay: table-row-group;\n\tposition: relative;\n}\n\n[mol_grid_table] > * {\n\tdisplay: table-row;\n\ttransition: none;\n}\n\n[mol_grid_head] > *,\n[mol_grid_table] > * > * {\n\tdisplay: table-cell;\n\tpadding: var(--mol_gap_text);\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tbox-shadow: inset 2px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_row]:where(:first-child) > * {\n\tbox-shadow: inset 2px 0 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > * > *:where(:first-child) {\n\tbox-shadow: inset 0px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > * {\n\tbox-shadow: inset 2px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > *:where(:first-child) {\n\tbox-shadow: inset 0px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > [mol_grid_row]:where(:first-child) > *:where(:first-child) {\n\tbox-shadow: none;\n}\t\n\n[mol_grid_head] {\n\tdisplay: table-row;\n\ttransform: none !important;\n}\n\n/* [mol_grid_cell_number] {\n\ttext-align: right;\n} */\n\n[mol_grid_col_head] {\n\tfont-weight: inherit;\n\ttext-align: inherit;\n\tdisplay: table-cell;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_grid_cell_dimmer] {\n\tdisplay: inline-block;\n\tvertical-align: inherit;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_tick) = class $mol_icon_tick extends ($.$mol_icon) {
		path(){
			return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
		}
	};


;
"use strict";


;
	($.$mol_check_box) = class $mol_check_box extends ($.$mol_check) {
		Icon(){
			const obj = new this.$.$mol_icon_tick();
			return obj;
		}
	};
	($mol_mem(($.$mol_check_box.prototype), "Icon"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/box/box.view.css", "[mol_check_box_icon] {\n\tborder-radius: var(--mol_gap_round);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n\tcolor: var(--mol_theme_shade);\n\theight: 1rem;\n\talign-self: center;\n}\n\n[mol_check]:not([mol_check_checked]) > [mol_check_box_icon] {\n\tfill: transparent;\n}\n\n[mol_check]:not([disabled]) > [mol_check_box_icon] {\n\tbackground: var(--mol_theme_field);\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$bog_ui_table) = class $bog_ui_table extends ($.$mol_grid) {
		cells(id){
			return [];
		}
		row_even(id){
			return false;
		}
		row_selected(id){
			return false;
		}
		col_head_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		head_button_content(id){
			return [];
		}
		all_selected(next){
			if(next !== undefined) return next;
			return false;
		}
		row_checked(id, next){
			if(next !== undefined) return next;
			return false;
		}
		cell_value(id, next){
			if(next !== undefined) return next;
			return "";
		}
		Cell_string(id){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.cell_value(id, next)));
			return obj;
		}
		columns(){
			return [];
		}
		data(){
			return [];
		}
		sort_column(next){
			if(next !== undefined) return next;
			return "";
		}
		sort_dir(next){
			if(next !== undefined) return next;
			return "asc";
		}
		selectable(){
			return false;
		}
		selected(next){
			if(next !== undefined) return next;
			return [];
		}
		Row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.minimal_height) = () => ((this.row_height()));
			(obj.minimal_width) = () => ((this.minimal_width()));
			(obj.cells) = () => ((this.cells(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_grid_row.prototype.attr.call(obj)), 
				"bog_ui_table_row_even": (this.row_even(id)), 
				"bog_ui_table_row_selected": (this.row_selected(id))
			});
			return obj;
		}
		Head_button(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.col_head_click(id, next)));
			(obj.sub) = () => ([(this.head_button_content(id))]);
			return obj;
		}
		Select_all(){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.all_selected(next)));
			return obj;
		}
		Select_row(id){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.row_checked(id, next)));
			return obj;
		}
		Cell_input(id){
			const obj = new this.$.$mol_grid_cell();
			(obj.sub) = () => ([(this.Cell_string(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$bog_ui_table.prototype), "col_head_click"));
	($mol_mem(($.$bog_ui_table.prototype), "all_selected"));
	($mol_mem_key(($.$bog_ui_table.prototype), "row_checked"));
	($mol_mem_key(($.$bog_ui_table.prototype), "cell_value"));
	($mol_mem_key(($.$bog_ui_table.prototype), "Cell_string"));
	($mol_mem(($.$bog_ui_table.prototype), "sort_column"));
	($mol_mem(($.$bog_ui_table.prototype), "sort_dir"));
	($mol_mem(($.$bog_ui_table.prototype), "selected"));
	($mol_mem_key(($.$bog_ui_table.prototype), "Row"));
	($mol_mem_key(($.$bog_ui_table.prototype), "Head_button"));
	($mol_mem(($.$bog_ui_table.prototype), "Select_all"));
	($mol_mem_key(($.$bog_ui_table.prototype), "Select_row"));
	($mol_mem_key(($.$bog_ui_table.prototype), "Cell_input"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_table extends $.$bog_ui_table {
            col_ids() {
                const columns = this.columns();
                if (!columns.length)
                    return [];
                const ids = columns.map((col) => String(col.id));
                if (this.selectable())
                    return ['__select', ...ids];
                return ids;
            }
            col_head_content(colId) {
                if (colId === '__select')
                    return [this.Select_all()];
                return [this.Head_button(colId)];
            }
            cells(id) {
                return this.col_ids().map(col_id => {
                    if (col_id === '__select')
                        return this.Select_row(id[0]);
                    return this.Cell_input({ row: id, col: col_id });
                });
            }
            cell_value(id, next) {
                if (next !== undefined)
                    return next;
                const val = this.record(id.row[id.row.length - 1])[id.col];
                return val == null ? '' : String(val);
            }
            row_checked(rowId, next) {
                if (next !== undefined) {
                    const sel = this.selected();
                    if (next) {
                        if (sel.indexOf(rowId) < 0)
                            this.selected([...sel, rowId]);
                    }
                    else {
                        this.selected(sel.filter(id => id !== rowId));
                    }
                }
                return this.selected().indexOf(rowId) >= 0;
            }
            all_selected(next) {
                if (next !== undefined) {
                    if (next) {
                        this.selected(this.row_ids().map(id => id[0]));
                    }
                    else {
                        this.selected([]);
                    }
                }
                const sel = this.selected();
                const rows = this.row_ids();
                return rows.length > 0 && sel.length >= rows.length;
            }
            row_selected(rowId) {
                return this.selected().indexOf(rowId[0]) >= 0;
            }
            head_button_content(colId) {
                const col = this.columns().find((c) => c.id === colId);
                const title = col?.title ?? colId;
                if (this.sort_column() !== colId)
                    return [title];
                const arrow = this.sort_dir() === 'asc' ? ' ▲' : ' ▼';
                return [title + arrow];
            }
            col_head_click(colId, next) {
                if (next === undefined)
                    return null;
                const col = this.columns().find((c) => c.id === colId);
                if (col?.sortable === false)
                    return null;
                if (this.sort_column() === colId) {
                    this.sort_dir(this.sort_dir() === 'asc' ? 'desc' : 'asc');
                }
                else {
                    this.sort_column(colId);
                    this.sort_dir('asc');
                }
                return null;
            }
            records() {
                const data = this.data();
                const result = {};
                for (let i = 0; i < data.length; i++) {
                    result[String(i)] = data[i];
                }
                return result;
            }
            row_ids() {
                const data = this.data();
                const indices = data.map((_, i) => [String(i)]);
                const sortCol = this.sort_column();
                if (!sortCol)
                    return indices;
                const dir = this.sort_dir() === 'desc' ? -1 : 1;
                indices.sort((a, b) => {
                    const va = data[Number(a[0])]?.[sortCol] ?? '';
                    const vb = data[Number(b[0])]?.[sortCol] ?? '';
                    if (typeof va === 'number' && typeof vb === 'number') {
                        return (va - vb) * dir;
                    }
                    return String(va).localeCompare(String(vb)) * dir;
                });
                return indices;
            }
            row_index_map() {
                const map = {};
                this.row_ids().forEach((id, i) => {
                    map[id[0]] = i;
                });
                return map;
            }
            row_even(row_id) {
                return (this.row_index_map()[row_id[0]] ?? 0) % 2 === 0;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_ui_table.prototype, "col_ids", null);
        __decorate([
            $mol_mem_key
        ], $bog_ui_table.prototype, "cell_value", null);
        __decorate([
            $mol_mem_key
        ], $bog_ui_table.prototype, "row_checked", null);
        __decorate([
            $mol_mem
        ], $bog_ui_table.prototype, "all_selected", null);
        __decorate([
            $mol_mem
        ], $bog_ui_table.prototype, "records", null);
        __decorate([
            $mol_mem
        ], $bog_ui_table.prototype, "row_ids", null);
        __decorate([
            $mol_mem
        ], $bog_ui_table.prototype, "row_index_map", null);
        $$.$bog_ui_table = $bog_ui_table;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/table/table.view.css", "[bog_ui_table_row_even=\"false\"] {\n\tbackground: var(--mol_theme_card);\n}\n\n[bog_ui_table_row_selected=\"true\"] {\n\tbackground: var(--mol_theme_current);\n}\n\n[bog_ui_table] [mol_grid_row]:hover {\n\tbackground: var(--mol_theme_current);\n}\n\n[bog_ui_table] [mol_grid_col_id=\"__select\"] {\n\twidth: 3rem;\n\tmin-width: 3rem;\n\tmax-width: 3rem;\n\tflex-shrink: 0;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_table, {
        overflow: { x: 'auto' },
        width: '100%',
        Head: {
            background: {
                color: $mol_theme.back,
            },
            position: 'sticky',
            top: 0,
            zIndex: 1,
        },
        Head_button: {
            justify: {
                content: 'flex-start',
            },
            flex: {
                grow: 1,
            },
            font: {
                weight: 'bold',
            },
            whiteSpace: 'nowrap',
        },
        Col_head: {
            border: {
                style: 'solid',
                width: 0,
                color: $mol_theme.line,
            },
            minWidth: '100px',
        },
        Row: {
            border: {
                style: 'solid',
                width: 0,
                color: $mol_theme.line,
            },
        },
        Cell_input: {
            flex: {
                grow: 1,
            },
            minWidth: '100px',
        },
        Select_all: {
            flex: {
                shrink: 0,
                grow: 0,
            },
            width: '3rem',
        },
        Select_row: {
            flex: {
                shrink: 0,
                grow: 0,
            },
            width: '3rem',
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_table) = class $bog_ui_app_table extends ($.$mol_page) {
		description(){
			return "Data table with sorting, row selection, and zebra striping. Click column headers to sort. Use checkboxes to select rows.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		selected_text(){
			return "No rows selected";
		}
		Selected_info(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.selected_text())]);
			return obj;
		}
		columns(){
			return [];
		}
		data(){
			return [];
		}
		selected(next){
			if(next !== undefined) return next;
			return [];
		}
		sort_column(next){
			if(next !== undefined) return next;
			return "";
		}
		sort_dir(next){
			if(next !== undefined) return next;
			return "asc";
		}
		Table(){
			const obj = new this.$.$bog_ui_table();
			(obj.columns) = () => ((this.columns()));
			(obj.data) = () => ((this.data()));
			(obj.selectable) = () => (true);
			(obj.selected) = (next) => ((this.selected(next)));
			(obj.sort_column) = (next) => ((this.sort_column(next)));
			(obj.sort_dir) = (next) => ((this.sort_dir(next)));
			return obj;
		}
		title(){
			return "Data Table";
		}
		body(){
			return [
				(this.Description()), 
				(this.Selected_info()), 
				(this.Table())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_table.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_table.prototype), "Selected_info"));
	($mol_mem(($.$bog_ui_app_table.prototype), "selected"));
	($mol_mem(($.$bog_ui_app_table.prototype), "sort_column"));
	($mol_mem(($.$bog_ui_app_table.prototype), "sort_dir"));
	($mol_mem(($.$bog_ui_app_table.prototype), "Table"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_app_table extends $.$bog_ui_app_table {
            columns() {
                return [
                    { id: 'name', title: 'Name', sortable: true },
                    { id: 'email', title: 'Email', sortable: true },
                    { id: 'department', title: 'Department', sortable: true },
                    { id: 'role', title: 'Role', sortable: true },
                    { id: 'salary', title: 'Salary', sortable: true },
                ];
            }
            data() {
                return [
                    { name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', role: 'Senior Developer', salary: 120000 },
                    { name: 'Bob Smith', email: 'bob@example.com', department: 'Design', role: 'UI Designer', salary: 95000 },
                    { name: 'Carol Williams', email: 'carol@example.com', department: 'Engineering', role: 'Tech Lead', salary: 145000 },
                    { name: 'David Brown', email: 'david@example.com', department: 'Marketing', role: 'Marketing Manager', salary: 105000 },
                    { name: 'Eva Martinez', email: 'eva@example.com', department: 'Engineering', role: 'Junior Developer', salary: 75000 },
                    { name: 'Frank Lee', email: 'frank@example.com', department: 'Sales', role: 'Sales Director', salary: 130000 },
                    { name: 'Grace Kim', email: 'grace@example.com', department: 'Design', role: 'UX Researcher', salary: 98000 },
                    { name: 'Henry Chen', email: 'henry@example.com', department: 'Engineering', role: 'DevOps Engineer', salary: 115000 },
                    { name: 'Iris Patel', email: 'iris@example.com', department: 'HR', role: 'HR Manager', salary: 100000 },
                    { name: 'Jack Wilson', email: 'jack@example.com', department: 'Engineering', role: 'Senior Developer', salary: 125000 },
                    { name: 'Karen Davis', email: 'karen@example.com', department: 'Finance', role: 'CFO', salary: 180000 },
                    { name: 'Leo Garcia', email: 'leo@example.com', department: 'Engineering', role: 'QA Engineer', salary: 90000 },
                    { name: 'Mia Thompson', email: 'mia@example.com', department: 'Marketing', role: 'Content Writer', salary: 72000 },
                    { name: 'Noah Robinson', email: 'noah@example.com', department: 'Engineering', role: 'Full Stack Developer', salary: 118000 },
                    { name: 'Olivia Clark', email: 'olivia@example.com', department: 'Design', role: 'Art Director', salary: 120000 },
                    { name: 'Peter Wright', email: 'peter@example.com', department: 'Sales', role: 'Account Manager', salary: 88000 },
                    { name: 'Quinn Adams', email: 'quinn@example.com', department: 'Engineering', role: 'Security Engineer', salary: 135000 },
                    { name: 'Rachel Scott', email: 'rachel@example.com', department: 'HR', role: 'Recruiter', salary: 78000 },
                    { name: 'Sam Turner', email: 'sam@example.com', department: 'Engineering', role: 'Backend Developer', salary: 112000 },
                    { name: 'Tina Morgan', email: 'tina@example.com', department: 'Finance', role: 'Financial Analyst', salary: 92000 },
                    { name: 'Uma Nguyen', email: 'uma@example.com', department: 'Engineering', role: 'ML Engineer', salary: 140000 },
                    { name: 'Victor Hall', email: 'victor@example.com', department: 'Marketing', role: 'SEO Specialist', salary: 82000 },
                ];
            }
            selected_text() {
                const sel = this.selected();
                const count = sel.length;
                if (count === 0)
                    return 'No rows selected';
                return `${count} row${count > 1 ? 's' : ''} selected`;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_ui_app_table.prototype, "selected_text", null);
        $$.$bog_ui_app_table = $bog_ui_app_table;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_table, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Selected_info: {
            font: {
                size: '1.125rem',
                weight: 'bold',
            },
            padding: {
                top: '0.5rem',
                bottom: '0.75rem',
            },
        },
        Table: {
            flex: {
                shrink: 1,
            },
            overflow: {
                x: 'auto',
            },
            minWidth: 0,
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_overview) = class $bog_ui_app_overview extends ($.$mol_page) {
		description(){
			return "Browse all available UI components. Click a card to see its full demo.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		go_badge(next){
			if(next !== undefined) return next;
			return null;
		}
		Badge_s(){
			const obj = new this.$.$bog_ui_badge();
			(obj.label) = () => ("Success");
			(obj.type) = () => ("success");
			return obj;
		}
		Badge_e(){
			const obj = new this.$.$bog_ui_badge();
			(obj.label) = () => ("Error");
			(obj.type) = () => ("error");
			return obj;
		}
		Badge_i(){
			const obj = new this.$.$bog_ui_badge();
			(obj.label) = () => ("Info");
			(obj.type) = () => ("info");
			return obj;
		}
		Badge_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Badge_s()), 
				(this.Badge_e()), 
				(this.Badge_i())
			]);
			return obj;
		}
		Card_badge(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("badge");
			(obj.card_title) = () => ("Badge");
			(obj.card_description) = () => ("Compact label with 5 color variants for status indication");
			(obj.click) = (next) => ((this.go_badge(next)));
			(obj.Preview) = () => ((this.Badge_preview()));
			return obj;
		}
		go_empty(next){
			if(next !== undefined) return next;
			return null;
		}
		Empty_icon(){
			const obj = new this.$.$mol_icon_magnify();
			return obj;
		}
		Empty_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["No results"]);
			return obj;
		}
		Empty_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Empty_icon()), (this.Empty_text())]);
			return obj;
		}
		Card_empty(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("empty");
			(obj.card_title) = () => ("Empty State");
			(obj.card_description) = () => ("Placeholder for pages with no content");
			(obj.click) = (next) => ((this.go_empty(next)));
			(obj.Preview) = () => ((this.Empty_preview()));
			return obj;
		}
		go_skeleton(next){
			if(next !== undefined) return next;
			return null;
		}
		Skel_1(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Skel_2(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Skel_3(){
			const obj = new this.$.$bog_ui_skeleton();
			return obj;
		}
		Skeleton_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Skel_1()), 
				(this.Skel_2()), 
				(this.Skel_3())
			]);
			return obj;
		}
		Card_skeleton(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("skeleton");
			(obj.card_title) = () => ("Skeleton");
			(obj.card_description) = () => ("Loading placeholder with shimmer animation");
			(obj.click) = (next) => ((this.go_skeleton(next)));
			(obj.Preview) = () => ((this.Skeleton_preview()));
			return obj;
		}
		go_breadcrumb(next){
			if(next !== undefined) return next;
			return null;
		}
		Bc_home(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Home"]);
			return obj;
		}
		Bc_sep(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([">"]);
			return obj;
		}
		Bc_cat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Catalog"]);
			return obj;
		}
		Bc_sep2(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([">"]);
			return obj;
		}
		Bc_cur(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Page"]);
			return obj;
		}
		Breadcrumb_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Bc_home()), 
				(this.Bc_sep()), 
				(this.Bc_cat()), 
				(this.Bc_sep2()), 
				(this.Bc_cur())
			]);
			return obj;
		}
		Card_breadcrumb(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("breadcrumb");
			(obj.card_title) = () => ("Breadcrumb");
			(obj.card_description) = () => ("Navigation breadcrumb trail with separator");
			(obj.click) = (next) => ((this.go_breadcrumb(next)));
			(obj.Preview) = () => ((this.Breadcrumb_preview()));
			return obj;
		}
		go_sidebar(next){
			if(next !== undefined) return next;
			return null;
		}
		Sb_i1(){
			const obj = new this.$.$mol_icon_home();
			return obj;
		}
		Sb_i2(){
			const obj = new this.$.$mol_icon_account();
			return obj;
		}
		Sb_i3(){
			const obj = new this.$.$mol_icon_cog();
			return obj;
		}
		Sb_bar(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Sb_i1()), 
				(this.Sb_i2()), 
				(this.Sb_i3())
			]);
			return obj;
		}
		Sb_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Content"]);
			return obj;
		}
		Sidebar_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Sb_bar()), (this.Sb_content())]);
			return obj;
		}
		Card_sidebar(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("sidebar");
			(obj.card_title) = () => ("Sidebar");
			(obj.card_description) = () => ("Side navigation panel with 3 display modes");
			(obj.click) = (next) => ((this.go_sidebar(next)));
			(obj.Preview) = () => ((this.Sidebar_preview()));
			return obj;
		}
		go_sheet(next){
			if(next !== undefined) return next;
			return null;
		}
		Sheet_panel(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Panel"]);
			return obj;
		}
		Sheet_box(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Sheet_panel())]);
			return obj;
		}
		Sheet_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Sheet_box())]);
			return obj;
		}
		Card_sheet(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("sheet");
			(obj.card_title) = () => ("Sheet");
			(obj.card_description) = () => ("Overlay panel sliding from screen edge");
			(obj.click) = (next) => ((this.go_sheet(next)));
			(obj.Preview) = () => ((this.Sheet_preview()));
			return obj;
		}
		go_toast(next){
			if(next !== undefined) return next;
			return null;
		}
		Toast_info_icon(){
			const obj = new this.$.$mol_icon_information();
			return obj;
		}
		Toast_info_mini(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Toast_info_icon()), "Info message"]);
			return obj;
		}
		Toast_ok_icon(){
			const obj = new this.$.$mol_icon_check_circle();
			return obj;
		}
		Toast_ok_mini(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Toast_ok_icon()), "Success!"]);
			return obj;
		}
		Toast_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Toast_info_mini()), (this.Toast_ok_mini())]);
			return obj;
		}
		Card_toast(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("toast");
			(obj.card_title) = () => ("Toast");
			(obj.card_description) = () => ("Notification messages with 4 severity types");
			(obj.click) = (next) => ((this.go_toast(next)));
			(obj.Preview) = () => ((this.Toast_preview()));
			return obj;
		}
		go_command(next){
			if(next !== undefined) return next;
			return null;
		}
		Cmd_icon(){
			const obj = new this.$.$mol_icon_magnify();
			return obj;
		}
		Cmd_search(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Cmd_icon()), "Search commands..."]);
			return obj;
		}
		Command_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Cmd_search())]);
			return obj;
		}
		Card_command(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("command");
			(obj.card_title) = () => ("Command Palette");
			(obj.card_description) = () => ("Search and execute commands via keyboard");
			(obj.click) = (next) => ((this.go_command(next)));
			(obj.Preview) = () => ((this.Command_preview()));
			return obj;
		}
		go_table(next){
			if(next !== undefined) return next;
			return null;
		}
		Tbl_head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				"Name", 
				"Email", 
				"Role"
			]);
			return obj;
		}
		Tbl_row1(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				"Alice", 
				"a@b.c", 
				"Dev"
			]);
			return obj;
		}
		Tbl_row2(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				"Bob", 
				"b@b.c", 
				"PM"
			]);
			return obj;
		}
		Table_preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Tbl_head()), 
				(this.Tbl_row1()), 
				(this.Tbl_row2())
			]);
			return obj;
		}
		Card_table(){
			const obj = new this.$.$bog_ui_app_overview_card();
			(obj.card_id) = () => ("table");
			(obj.card_title) = () => ("Data Table");
			(obj.card_description) = () => ("Sortable data grid with row selection");
			(obj.click) = (next) => ((this.go_table(next)));
			(obj.Preview) = () => ((this.Table_preview()));
			return obj;
		}
		cards(){
			return [
				(this.Card_badge()), 
				(this.Card_empty()), 
				(this.Card_skeleton()), 
				(this.Card_breadcrumb()), 
				(this.Card_sidebar()), 
				(this.Card_sheet()), 
				(this.Card_toast()), 
				(this.Card_command()), 
				(this.Card_table())
			];
		}
		Grid(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.cards()));
			return obj;
		}
		title(){
			return "Components Overview";
		}
		body(){
			return [(this.Description()), (this.Grid())];
		}
	};
	($mol_mem(($.$bog_ui_app_overview.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_badge"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Badge_s"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Badge_e"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Badge_i"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Badge_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_badge"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_empty"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Empty_icon"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Empty_text"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Empty_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_empty"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_skeleton"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Skel_1"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Skel_2"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Skel_3"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Skeleton_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_skeleton"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_breadcrumb"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Bc_home"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Bc_sep"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Bc_cat"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Bc_sep2"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Bc_cur"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Breadcrumb_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_breadcrumb"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_sidebar"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sb_i1"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sb_i2"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sb_i3"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sb_bar"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sb_content"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sidebar_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_sidebar"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_sheet"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sheet_panel"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sheet_box"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Sheet_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_sheet"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_toast"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Toast_info_icon"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Toast_info_mini"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Toast_ok_icon"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Toast_ok_mini"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Toast_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_toast"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_command"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Cmd_icon"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Cmd_search"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Command_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_command"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "go_table"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Tbl_head"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Tbl_row1"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Tbl_row2"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Table_preview"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Card_table"));
	($mol_mem(($.$bog_ui_app_overview.prototype), "Grid"));
	($.$bog_ui_app_overview_card) = class $bog_ui_app_overview_card extends ($.$mol_button_minor) {
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.card_title())]);
			return obj;
		}
		Card_desc(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.card_description())]);
			return obj;
		}
		card_id(){
			return "";
		}
		card_title(){
			return "";
		}
		card_description(){
			return "";
		}
		Preview(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		attr(){
			return {...(super.attr()), "bog_ui_app_overview_card": true};
		}
		sub(){
			return [
				(this.Preview()), 
				(this.Title()), 
				(this.Card_desc())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_overview_card.prototype), "Title"));
	($mol_mem(($.$bog_ui_app_overview_card.prototype), "Card_desc"));
	($mol_mem(($.$bog_ui_app_overview_card.prototype), "Preview"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_app_overview extends $.$bog_ui_app_overview {
            go_badge(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'badge');
                return null;
            }
            go_empty(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'empty');
                return null;
            }
            go_skeleton(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'skeleton');
                return null;
            }
            go_breadcrumb(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'breadcrumb');
                return null;
            }
            go_sidebar(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'sidebar');
                return null;
            }
            go_sheet(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'sheet');
                return null;
            }
            go_toast(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'toast');
                return null;
            }
            go_command(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'command');
                return null;
            }
            go_table(next) {
                if (next !== undefined)
                    $mol_state_arg.value('component', 'table');
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_badge", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_empty", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_skeleton", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_breadcrumb", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_sidebar", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_sheet", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_toast", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_command", null);
        __decorate([
            $mol_action
        ], $bog_ui_app_overview.prototype, "go_table", null);
        $$.$bog_ui_app_overview = $bog_ui_app_overview;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/app/overview/overview.view.css", "[bog_ui_app_overview_card] {\n\tborder: 1px solid var(--mol_theme_line);\n}\n\n[bog_ui_app_overview_card]:hover {\n\tbox-shadow: 0 4px 12px #00000022;\n}\n\n/* Breadcrumb preview inline layout */\n[bog_ui_app_overview_card] .bog_ui_app_overview_card_mol_view {\n\tdisplay: inline;\n}\n\n/* Sidebar preview layout */\n.bog_ui_app_overview_Sb_bar {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.25rem;\n\tpadding: 0.5rem;\n\tbackground: var(--mol_theme_card);\n\tborder-radius: 0.25rem;\n}\n\n.bog_ui_app_overview_Sb_content {\n\tflex: 1;\n\tpadding: 0.5rem;\n\tcolor: var(--mol_theme_shade);\n\tfont-size: 0.75rem;\n}\n\n/* Sheet preview box */\n.bog_ui_app_overview_Sheet_box {\n\twidth: 100%;\n\theight: 48px;\n\tborder: 1px solid var(--mol_theme_line);\n\tborder-radius: 0.25rem;\n\tposition: relative;\n\toverflow: hidden;\n}\n\n.bog_ui_app_overview_Sheet_panel {\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\tbottom: 0;\n\twidth: 40%;\n\tbackground: var(--mol_theme_card);\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tfont-size: 0.75rem;\n\tcolor: var(--mol_theme_shade);\n\tborder-left: 1px solid var(--mol_theme_line);\n}\n\n/* Toast mini items */\n.bog_ui_app_overview_Toast_info_mini,\n.bog_ui_app_overview_Toast_ok_mini {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.25rem;\n\tfont-size: 0.75rem;\n\tpadding: 0.25rem 0.5rem;\n\tborder-radius: 0.25rem;\n\tbackground: var(--mol_theme_card);\n}\n\n/* Command search bar */\n.bog_ui_app_overview_Cmd_search {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tpadding: 0.375rem 0.75rem;\n\tborder: 1px solid var(--mol_theme_line);\n\tborder-radius: 0.375rem;\n\tcolor: var(--mol_theme_shade);\n\tfont-size: 0.8125rem;\n\twidth: 100%;\n\tbox-sizing: border-box;\n}\n\n/* Table preview */\n.bog_ui_app_overview_Tbl_head,\n.bog_ui_app_overview_Tbl_row1,\n.bog_ui_app_overview_Tbl_row2 {\n\tdisplay: grid;\n\tgrid-template-columns: 1fr 1fr 1fr;\n\tgap: 0.5rem;\n\tfont-size: 0.6875rem;\n\tpadding: 0.125rem 0;\n}\n\n.bog_ui_app_overview_Tbl_head {\n\tfont-weight: bold;\n\tborder-bottom: 1px solid var(--mol_theme_line);\n\tpadding-bottom: 0.25rem;\n\tmargin-bottom: 0.125rem;\n}\n\n/* Empty state preview */\n.bog_ui_app_overview_Empty_preview {\n\tflex-direction: column;\n}\n\n.bog_ui_app_overview_Empty_text {\n\tfont-size: 0.75rem;\n\tcolor: var(--mol_theme_shade);\n}\n\n/* Skeleton preview */\n.bog_ui_app_overview_Skeleton_preview {\n\tflex-direction: column;\n\twidth: 100%;\n}\n\n/* Sidebar preview row */\n.bog_ui_app_overview_Sidebar_preview {\n\tflex-wrap: nowrap;\n\tgap: 0;\n}\n\n/* Breadcrumb preview */\n.bog_ui_app_overview_Breadcrumb_preview {\n\tgap: 0.375rem;\n\tfont-size: 0.8125rem;\n}\n\n.bog_ui_app_overview_Bc_sep,\n.bog_ui_app_overview_Bc_sep2 {\n\tcolor: var(--mol_theme_shade);\n}\n\n.bog_ui_app_overview_Bc_cur {\n\tfont-weight: bold;\n}\n\n/* Table preview full width */\n.bog_ui_app_overview_Table_preview {\n\tflex-direction: column;\n\twidth: 100%;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app_overview, {
        padding: $mol_gap.block,
        Description: {
            color: $mol_theme.shade,
            padding: {
                bottom: '1rem',
            },
        },
        Grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1rem',
            padding: {
                top: '0.5rem',
            },
        },
    });
    $mol_style_define($bog_ui_app_overview_card, {
        display: 'flex',
        flex: {
            direction: 'column',
        },
        background: {
            color: $mol_theme.card,
        },
        borderRadius: '0.5rem',
        overflow: {
            x: 'hidden',
            y: 'hidden',
        },
        cursor: 'pointer',
        textAlign: 'left',
        Preview: {
            display: 'flex',
            flex: {
                wrap: 'wrap',
            },
            gap: '0.5rem',
            align: {
                items: 'center',
            },
            justify: {
                content: 'center',
            },
            padding: {
                top: '1.25rem',
                bottom: '1.25rem',
                left: '1rem',
                right: '1rem',
            },
            background: {
                color: $mol_theme.back,
            },
            minHeight: '80px',
        },
        Title: {
            font: {
                size: '1rem',
                weight: 'bold',
            },
            padding: {
                top: '0.75rem',
                left: '1rem',
                right: '1rem',
            },
            overflowWrap: 'break-word',
        },
        Card_desc: {
            font: {
                size: '0.8125rem',
            },
            color: $mol_theme.shade,
            padding: {
                top: '0.25rem',
                bottom: '0.75rem',
                left: '1rem',
                right: '1rem',
            },
            overflowWrap: 'break-word',
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_divider) = class $bog_ui_divider extends ($.$mol_view) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_divider, {
        margin: {
            bottom: $mol_gap.block,
            top: $mol_gap.block,
        },
        width: '100%',
        border: {
            bottom: {
                width: '2px',
                style: 'solid',
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_ui_app_divider) = class $bog_ui_app_divider extends ($.$mol_page) {
		description(){
			return "Horizontal line to separate content.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		Divider(){
			const obj = new this.$.$bog_ui_divider();
			return obj;
		}
		title(){
			return "Divider";
		}
		body(){
			return [(this.Description()), (this.Divider())];
		}
	};
	($mol_mem(($.$bog_ui_app_divider.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_divider.prototype), "Divider"));


;
"use strict";


;
	($.$mol_icon_upload) = class $mol_icon_upload extends ($.$mol_icon) {
		path(){
			return "M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z";
		}
	};


;
"use strict";


;
	($.$mol_button_open) = class $mol_button_open extends ($.$mol_button_minor) {
		Icon(){
			const obj = new this.$.$mol_icon_upload();
			return obj;
		}
		files(next){
			if(next !== undefined) return next;
			return [];
		}
		files_handled(next){
			return (this.files(next));
		}
		accept(){
			return "";
		}
		multiple(){
			return true;
		}
		Native(){
			const obj = new this.$.$mol_button_open_native();
			(obj.files) = (next) => ((this.files_handled(next)));
			(obj.accept) = () => ((this.accept()));
			(obj.multiple) = () => ((this.multiple()));
			return obj;
		}
		sub(){
			return [(this.Icon()), (this.Native())];
		}
	};
	($mol_mem(($.$mol_button_open.prototype), "Icon"));
	($mol_mem(($.$mol_button_open.prototype), "files"));
	($mol_mem(($.$mol_button_open.prototype), "Native"));
	($.$mol_button_open_native) = class $mol_button_open_native extends ($.$mol_view) {
		accept(){
			return "";
		}
		multiple(){
			return true;
		}
		picked(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "input";
		}
		files(next){
			if(next !== undefined) return next;
			return [];
		}
		attr(){
			return {
				"type": "file", 
				"accept": (this.accept()), 
				"multiple": (this.multiple())
			};
		}
		event(){
			return {"change": (next) => (this.picked(next))};
		}
	};
	($mol_mem(($.$mol_button_open_native.prototype), "picked"));
	($mol_mem(($.$mol_button_open_native.prototype), "files"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button_open extends $.$mol_button_open {
            files_handled(next) {
                try {
                    const files = this.files(next);
                    this.status([null]);
                    return files;
                }
                catch (error) {
                    // Calling actions from catch section, if throwing promise breaks idempotency
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
        }
        $$.$mol_button_open = $mol_button_open;
        /**
         * File open button
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button_open_native extends $.$mol_button_open_native {
            dom_node() {
                return super.dom_node();
            }
            picked() {
                const files = this.dom_node().files;
                if (!files || !files.length)
                    return;
                this.files([...files]);
            }
        }
        $$.$mol_button_open_native = $mol_button_open_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/open/open.view.css", "[mol_button_open_native] {\n\tposition: absolute;\n\tleft: 0;\n\ttop: -100%;\n\twidth: 100%;\n\theight: 200%;\n\tcursor: pointer;\n\topacity: 0;\n}\n");
})($ || ($ = {}));

;
	($.$bog_ui_app_tooltip) = class $bog_ui_app_tooltip extends ($.$mol_page) {
		description(){
			return "Instant CSS-tooltip plugin. Plug it once into the root view's `plugins /`, then any element with `title=` or any $mol component with `hint` shows a custom bubble without the native ~700ms browser delay.";
		}
		Description(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.description())]);
			return obj;
		}
		usage_title(){
			return "Usage";
		}
		Usage_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.usage_title())]);
			return obj;
		}
		usage_code(){
			return "plugins /\\n    <= Tip $bog_ui_tooltip";
		}
		Usage_code(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.usage_code())]);
			return obj;
		}
		demo_title(){
			return "Demo";
		}
		Demo_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.demo_title())]);
			return obj;
		}
		demo_hint(){
			return "Hover any of the elements below — the bubble appears immediately.";
		}
		Demo_hint(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.demo_hint())]);
			return obj;
		}
		Btn_simple(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ("Hello, I am a tooltip");
			(obj.sub) = () => (["Simple"]);
			return obj;
		}
		Btn_long(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ("A longer hint that explains in detail what this control will do when activated.");
			(obj.sub) = () => (["Long text"]);
			return obj;
		}
		Btn_icon_glyph(){
			const obj = new this.$.$mol_icon_cog();
			return obj;
		}
		Btn_icon(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ("Settings");
			(obj.sub) = () => ([(this.Btn_icon_glyph())]);
			return obj;
		}
		demo_files(next){
			if(next !== undefined) return next;
			return [];
		}
		Btn_input(){
			const obj = new this.$.$mol_button_open();
			(obj.hint) = () => ("Pick a file from disk");
			(obj.accept) = () => ("image/*");
			(obj.files) = (next) => ((this.demo_files(next)));
			return obj;
		}
		Inline_text(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({"title": "Plain HTML title attribute on a span"});
			(obj.sub) = () => (["Hover this text"]);
			return obj;
		}
		Demo(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Btn_simple()), 
				(this.Btn_long()), 
				(this.Btn_icon()), 
				(this.Btn_input()), 
				(this.Inline_text())
			]);
			return obj;
		}
		title(){
			return "Tooltip";
		}
		body(){
			return [
				(this.Description()), 
				(this.Usage_title()), 
				(this.Usage_code()), 
				(this.Demo_title()), 
				(this.Demo_hint()), 
				(this.Demo())
			];
		}
	};
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Description"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Usage_title"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Usage_code"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Demo_title"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Demo_hint"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Btn_simple"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Btn_long"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Btn_icon_glyph"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Btn_icon"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "demo_files"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Btn_input"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Inline_text"));
	($mol_mem(($.$bog_ui_app_tooltip.prototype), "Demo"));


;
"use strict";


;
	($.$bog_ui_app) = class $bog_ui_app extends ($.$mol_book2) {
		Theme(){
			const obj = new this.$.$mol_theme_auto();
			return obj;
		}
		Tip(){
			const obj = new this.$.$bog_ui_tooltip();
			return obj;
		}
		global_keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		sidebar_mode(next){
			if(next !== undefined) return next;
			return "dock";
		}
		Overview_icon(){
			const obj = new this.$.$mol_icon_view_grid();
			return obj;
		}
		overview_active(){
			return false;
		}
		nav_overview(next){
			if(next !== undefined) return next;
			return null;
		}
		Overview_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Overview_icon()));
			(obj.label) = () => ("Overview");
			(obj.active) = () => ((this.overview_active()));
			(obj.click) = (next) => ((this.nav_overview(next)));
			return obj;
		}
		Badge_icon(){
			const obj = new this.$.$mol_icon_tag();
			return obj;
		}
		badge_active(){
			return false;
		}
		nav_badge(next){
			if(next !== undefined) return next;
			return null;
		}
		Badge_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Badge_icon()));
			(obj.label) = () => ("Badge");
			(obj.active) = () => ((this.badge_active()));
			(obj.click) = (next) => ((this.nav_badge(next)));
			return obj;
		}
		Empty_icon(){
			const obj = new this.$.$mol_icon_file();
			return obj;
		}
		empty_active(){
			return false;
		}
		nav_empty(next){
			if(next !== undefined) return next;
			return null;
		}
		Empty_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Empty_icon()));
			(obj.label) = () => ("Empty State");
			(obj.active) = () => ((this.empty_active()));
			(obj.click) = (next) => ((this.nav_empty(next)));
			return obj;
		}
		Skeleton_icon(){
			const obj = new this.$.$mol_icon_rectangle();
			return obj;
		}
		skeleton_active(){
			return false;
		}
		nav_skeleton(next){
			if(next !== undefined) return next;
			return null;
		}
		Skeleton_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Skeleton_icon()));
			(obj.label) = () => ("Skeleton");
			(obj.active) = () => ((this.skeleton_active()));
			(obj.click) = (next) => ((this.nav_skeleton(next)));
			return obj;
		}
		Breadcrumb_icon(){
			const obj = new this.$.$mol_icon_navigation();
			return obj;
		}
		breadcrumb_active(){
			return false;
		}
		nav_breadcrumb(next){
			if(next !== undefined) return next;
			return null;
		}
		Breadcrumb_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Breadcrumb_icon()));
			(obj.label) = () => ("Breadcrumb");
			(obj.active) = () => ((this.breadcrumb_active()));
			(obj.click) = (next) => ((this.nav_breadcrumb(next)));
			return obj;
		}
		Sidebar_icon(){
			const obj = new this.$.$mol_icon_dock_left();
			return obj;
		}
		sidebar_active(){
			return false;
		}
		nav_sidebar(next){
			if(next !== undefined) return next;
			return null;
		}
		Sidebar_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Sidebar_icon()));
			(obj.label) = () => ("Sidebar");
			(obj.active) = () => ((this.sidebar_active()));
			(obj.click) = (next) => ((this.nav_sidebar(next)));
			return obj;
		}
		Sheet_icon(){
			const obj = new this.$.$mol_icon_card();
			return obj;
		}
		sheet_active(){
			return false;
		}
		nav_sheet(next){
			if(next !== undefined) return next;
			return null;
		}
		Sheet_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Sheet_icon()));
			(obj.label) = () => ("Sheet");
			(obj.active) = () => ((this.sheet_active()));
			(obj.click) = (next) => ((this.nav_sheet(next)));
			return obj;
		}
		Toast_icon(){
			const obj = new this.$.$mol_icon_bell();
			return obj;
		}
		toast_active(){
			return false;
		}
		nav_toast(next){
			if(next !== undefined) return next;
			return null;
		}
		Toast_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Toast_icon()));
			(obj.label) = () => ("Toast");
			(obj.active) = () => ((this.toast_active()));
			(obj.click) = (next) => ((this.nav_toast(next)));
			return obj;
		}
		Command_icon(){
			const obj = new this.$.$mol_icon_console();
			return obj;
		}
		command_active(){
			return false;
		}
		nav_command(next){
			if(next !== undefined) return next;
			return null;
		}
		Command_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Command_icon()));
			(obj.label) = () => ("Command");
			(obj.active) = () => ((this.command_active()));
			(obj.click) = (next) => ((this.nav_command(next)));
			return obj;
		}
		Table_icon(){
			const obj = new this.$.$mol_icon_table();
			return obj;
		}
		table_active(){
			return false;
		}
		nav_table(next){
			if(next !== undefined) return next;
			return null;
		}
		Table_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Table_icon()));
			(obj.label) = () => ("Data Table");
			(obj.active) = () => ((this.table_active()));
			(obj.click) = (next) => ((this.nav_table(next)));
			return obj;
		}
		Divider_icon(){
			const obj = new this.$.$mol_icon_minus();
			return obj;
		}
		divider_active(){
			return false;
		}
		nav_divider(next){
			if(next !== undefined) return next;
			return null;
		}
		Divider_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Divider_icon()));
			(obj.label) = () => ("Divider");
			(obj.active) = () => ((this.divider_active()));
			(obj.click) = (next) => ((this.nav_divider(next)));
			return obj;
		}
		Tooltip_icon(){
			const obj = new this.$.$mol_icon_message();
			return obj;
		}
		tooltip_active(){
			return false;
		}
		nav_tooltip(next){
			if(next !== undefined) return next;
			return null;
		}
		Tooltip_nav(){
			const obj = new this.$.$bog_ui_sidebar_item();
			(obj.Icon) = () => ((this.Tooltip_icon()));
			(obj.label) = () => ("Tooltip");
			(obj.active) = () => ((this.tooltip_active()));
			(obj.click) = (next) => ((this.nav_tooltip(next)));
			return obj;
		}
		Nav(){
			const obj = new this.$.$bog_ui_sidebar();
			(obj.mode) = (next) => ((this.sidebar_mode(next)));
			(obj.items) = () => ([
				(this.Overview_nav()), 
				(this.Badge_nav()), 
				(this.Empty_nav()), 
				(this.Skeleton_nav()), 
				(this.Breadcrumb_nav()), 
				(this.Sidebar_nav()), 
				(this.Sheet_nav()), 
				(this.Toast_nav()), 
				(this.Command_nav()), 
				(this.Table_nav()), 
				(this.Divider_nav()), 
				(this.Tooltip_nav())
			]);
			return obj;
		}
		page_title(){
			return "Components";
		}
		Theme_toggle(){
			const obj = new this.$.$mol_lights_toggle();
			return obj;
		}
		page_text(){
			return "Select a component from the sidebar";
		}
		Page_body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.page_text())]);
			return obj;
		}
		Content_page(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.page_title()));
			(obj.tools) = () => ([(this.Theme_toggle())]);
			(obj.body) = () => ([(this.Page_body())]);
			return obj;
		}
		plugins(){
			return [
				...(super.plugins()), 
				(this.Theme()), 
				(this.Tip())
			];
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.global_keydown(next))};
		}
		command_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		Command(){
			const obj = new this.$.$bog_ui_command();
			(obj.showed) = (next) => ((this.command_showed(next)));
			return obj;
		}
		Badge_page(){
			const obj = new this.$.$bog_ui_app_badge();
			return obj;
		}
		Empty_page(){
			const obj = new this.$.$bog_ui_app_empty();
			return obj;
		}
		Skeleton_page(){
			const obj = new this.$.$bog_ui_app_skeleton();
			return obj;
		}
		Breadcrumb_page(){
			const obj = new this.$.$bog_ui_app_breadcrumb();
			return obj;
		}
		Sidebar_page(){
			const obj = new this.$.$bog_ui_app_sidebar();
			return obj;
		}
		Sheet_page(){
			const obj = new this.$.$bog_ui_app_sheet();
			return obj;
		}
		Toast_page(){
			const obj = new this.$.$bog_ui_app_toast();
			return obj;
		}
		Command_page(){
			const obj = new this.$.$bog_ui_app_command();
			return obj;
		}
		Table_page(){
			const obj = new this.$.$bog_ui_app_table();
			return obj;
		}
		Overview_page(){
			const obj = new this.$.$bog_ui_app_overview();
			return obj;
		}
		Divider_page(){
			const obj = new this.$.$bog_ui_app_divider();
			return obj;
		}
		Tooltip_page(){
			const obj = new this.$.$bog_ui_app_tooltip();
			return obj;
		}
		pages(){
			return [(this.Nav()), (this.Content_page())];
		}
	};
	($mol_mem(($.$bog_ui_app.prototype), "Theme"));
	($mol_mem(($.$bog_ui_app.prototype), "Tip"));
	($mol_mem(($.$bog_ui_app.prototype), "global_keydown"));
	($mol_mem(($.$bog_ui_app.prototype), "sidebar_mode"));
	($mol_mem(($.$bog_ui_app.prototype), "Overview_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_overview"));
	($mol_mem(($.$bog_ui_app.prototype), "Overview_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Badge_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_badge"));
	($mol_mem(($.$bog_ui_app.prototype), "Badge_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Empty_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_empty"));
	($mol_mem(($.$bog_ui_app.prototype), "Empty_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Skeleton_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_skeleton"));
	($mol_mem(($.$bog_ui_app.prototype), "Skeleton_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Breadcrumb_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_breadcrumb"));
	($mol_mem(($.$bog_ui_app.prototype), "Breadcrumb_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Sidebar_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_sidebar"));
	($mol_mem(($.$bog_ui_app.prototype), "Sidebar_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Sheet_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_sheet"));
	($mol_mem(($.$bog_ui_app.prototype), "Sheet_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Toast_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_toast"));
	($mol_mem(($.$bog_ui_app.prototype), "Toast_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Command_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_command"));
	($mol_mem(($.$bog_ui_app.prototype), "Command_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Table_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_table"));
	($mol_mem(($.$bog_ui_app.prototype), "Table_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Divider_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_divider"));
	($mol_mem(($.$bog_ui_app.prototype), "Divider_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Tooltip_icon"));
	($mol_mem(($.$bog_ui_app.prototype), "nav_tooltip"));
	($mol_mem(($.$bog_ui_app.prototype), "Tooltip_nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Nav"));
	($mol_mem(($.$bog_ui_app.prototype), "Theme_toggle"));
	($mol_mem(($.$bog_ui_app.prototype), "Page_body"));
	($mol_mem(($.$bog_ui_app.prototype), "Content_page"));
	($mol_mem(($.$bog_ui_app.prototype), "command_showed"));
	($mol_mem(($.$bog_ui_app.prototype), "Command"));
	($mol_mem(($.$bog_ui_app.prototype), "Badge_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Empty_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Skeleton_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Breadcrumb_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Sidebar_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Sheet_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Toast_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Command_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Table_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Overview_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Divider_page"));
	($mol_mem(($.$bog_ui_app.prototype), "Tooltip_page"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_ui_app extends $.$bog_ui_app {
            size_watcher() {
                const node = this.dom_node();
                const observer = new ResizeObserver(entries => {
                    const width = entries[0]?.contentRect.width ?? 0;
                    if (width <= 0)
                        return;
                    if (width < 500) {
                        this.sidebar_mode('hidden');
                    }
                    else if (width < 900) {
                        this.sidebar_mode('rail');
                    }
                    else {
                        this.sidebar_mode('dock');
                    }
                });
                observer.observe(node);
                return { destructor: () => observer.disconnect() };
            }
            sub() {
                this.size_watcher();
                return [
                    ...this.pages(),
                    this.Command(),
                ];
            }
            global_keydown(event) {
                if (!event)
                    return null;
                if (event.key !== 'k' && event.key !== 'K')
                    return null;
                if (!event.metaKey && !event.ctrlKey)
                    return null;
                event.preventDefault();
                this.command_showed(!this.command_showed());
                return null;
            }
            component(next) {
                return $mol_state_arg.value('component', next) ?? '';
            }
            overview_active() {
                return this.component() === '';
            }
            badge_active() {
                return this.component() === 'badge';
            }
            empty_active() {
                return this.component() === 'empty';
            }
            skeleton_active() {
                return this.component() === 'skeleton';
            }
            breadcrumb_active() {
                return this.component() === 'breadcrumb';
            }
            sidebar_active() {
                return this.component() === 'sidebar';
            }
            sheet_active() {
                return this.component() === 'sheet';
            }
            toast_active() {
                return this.component() === 'toast';
            }
            command_active() {
                return this.component() === 'command';
            }
            table_active() {
                return this.component() === 'table';
            }
            tooltip_active() {
                return this.component() === 'tooltip';
            }
            nav_overview(next) {
                if (next !== undefined)
                    this.component('');
                return null;
            }
            nav_badge(next) {
                if (next !== undefined)
                    this.component('badge');
                return null;
            }
            nav_empty(next) {
                if (next !== undefined)
                    this.component('empty');
                return null;
            }
            nav_skeleton(next) {
                if (next !== undefined)
                    this.component('skeleton');
                return null;
            }
            nav_breadcrumb(next) {
                if (next !== undefined)
                    this.component('breadcrumb');
                return null;
            }
            nav_sidebar(next) {
                if (next !== undefined)
                    this.component('sidebar');
                return null;
            }
            nav_sheet(next) {
                if (next !== undefined)
                    this.component('sheet');
                return null;
            }
            nav_toast(next) {
                if (next !== undefined)
                    this.component('toast');
                return null;
            }
            nav_command(next) {
                if (next !== undefined)
                    this.component('command');
                return null;
            }
            nav_table(next) {
                if (next !== undefined)
                    this.component('table');
                return null;
            }
            nav_divider(next) {
                if (next !== undefined)
                    this.component('divider');
                return null;
            }
            nav_tooltip(next) {
                if (next !== undefined)
                    this.component('tooltip');
                return null;
            }
            page_title() {
                const titles = {
                    badge: 'Badge',
                    empty: 'Empty State',
                    skeleton: 'Skeleton',
                    breadcrumb: 'Breadcrumb',
                    sidebar: 'Sidebar',
                    sheet: 'Sheet',
                    toast: 'Toast',
                    command: 'Command Palette',
                    table: 'Data Table',
                    divider: 'Divider',
                    tooltip: 'Tooltip',
                };
                return titles[this.component()] ?? 'Components Overview';
            }
            page_text() {
                const comp = this.component();
                if (!comp)
                    return 'Select a component from the sidebar';
                return `Demo for ${this.page_title()} component`;
            }
            pages() {
                const comp = this.component();
                let content;
                switch (comp) {
                    case 'badge':
                        content = this.Badge_page();
                        break;
                    case 'empty':
                        content = this.Empty_page();
                        break;
                    case 'skeleton':
                        content = this.Skeleton_page();
                        break;
                    case 'breadcrumb':
                        content = this.Breadcrumb_page();
                        break;
                    case 'sidebar':
                        content = this.Sidebar_page();
                        break;
                    case 'sheet':
                        content = this.Sheet_page();
                        break;
                    case 'toast':
                        content = this.Toast_page();
                        break;
                    case 'command':
                        content = this.Command_page();
                        break;
                    case 'table':
                        content = this.Table_page();
                        break;
                    case 'divider':
                        content = this.Divider_page();
                        break;
                    case 'tooltip':
                        content = this.Tooltip_page();
                        break;
                    default: content = this.Overview_page();
                }
                return [
                    this.Nav(),
                    content,
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "size_watcher", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "global_keydown", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "component", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "overview_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "badge_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "empty_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "skeleton_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "breadcrumb_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "sidebar_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "sheet_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "toast_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "command_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "table_active", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "tooltip_active", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_overview", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_badge", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_empty", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_skeleton", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_breadcrumb", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_sidebar", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_sheet", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_toast", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_command", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_table", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_divider", null);
        __decorate([
            $mol_action
        ], $bog_ui_app.prototype, "nav_tooltip", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "page_title", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "page_text", null);
        __decorate([
            $mol_mem
        ], $bog_ui_app.prototype, "pages", null);
        $$.$bog_ui_app = $bog_ui_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
var $node = $node || {} ; $node[ "/bog/ui/app/favicon.svg" ] = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+CiAgPHN0eWxlPgogICAgLmJnIHsgZmlsbDogIzFhMWEyZTsgfQogICAgLmZnIHsgZmlsbDogI2UwZTBlMDsgfQogICAgQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpIHsKICAgICAgLmJnIHsgZmlsbDogI2YwZjBmNTsgfQogICAgICAuZmcgeyBmaWxsOiAjMWExYTJlOyB9CiAgICB9CiAgPC9zdHlsZT4KICA8cmVjdCBjbGFzcz0iYmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgcng9IjYiLz4KICA8dGV4dCBjbGFzcz0iZmciIHg9IjE2IiB5PSIyMyIgZm9udC1mYW1pbHk9InN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iNzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CPC90ZXh0Pgo8L3N2Zz4K"

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/ui/app/app.view.css", "/* Content pages fill remaining space (override $mol_book2 flex-shrink: 0) */\n[bog_ui_app] > [mol_page] {\n\tflex-shrink: 1;\n\tflex-grow: 1;\n\tmin-width: 0;\n}\n\n/* Toolbar tools wrap when not enough space */\n[bog_ui_app] [mol_page_head] {\n\tflex-wrap: wrap;\n}\n\n/* Page title truncates with ellipsis, doesn't break layout */\n[bog_ui_app] [mol_page_title] {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tmin-width: 0;\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_ui_app, {
        Content_page: {
            flex: {
                grow: 1,
                shrink: 1,
            },
            minWidth: 0,
        },
        Page_body: {
            padding: $mol_gap.block,
            color: $mol_theme.shade,
            overflow: {
                y: 'auto',
            },
            flex: {
                shrink: 1,
            },
        },
    });
})($ || ($ = {}));


export default $
//# sourceMappingURL=web.js.map
