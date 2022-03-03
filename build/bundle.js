
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/About.svelte generated by Svelte v3.42.2 */

    const file$4 = "src/About.svelte";

    function create_fragment$4(ctx) {
    	let header;
    	let div3;
    	let div0;
    	let h1;
    	let t0;
    	let span;
    	let t2;
    	let t3;
    	let h2;
    	let t5;
    	let b;
    	let t6;
    	let div1;
    	let p0;
    	let t7;
    	let a0;
    	let t9;
    	let t10;
    	let p1;
    	let t12;
    	let p2;
    	let t14;
    	let p3;
    	let strong;
    	let t16;
    	let a1;
    	let t18;
    	let a2;
    	let t20;
    	let a3;
    	let t22;
    	let a4;
    	let t24;
    	let div2;
    	let ul;
    	let li0;
    	let a5;
    	let t26;
    	let li1;
    	let a6;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div3 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text("Erin ");
    			span = element("span");
    			span.textContent = "|";
    			t2 = text(" Caughey");
    			t3 = space();
    			h2 = element("h2");
    			h2.textContent = "Data — Development — Design";
    			t5 = space();
    			b = element("b");
    			t6 = space();
    			div1 = element("div");
    			p0 = element("p");
    			t7 = text("I've worked in several roles at the ");
    			a0 = element("a");
    			a0.textContent = "Milwaukee Journal Sentinel";
    			t9 = text(" since 2014. Starting as a nightside homepage manager, moving into special projects production and design, and for the last three years, as a data visualization journalist covering the news with code, data and design across newsroom departments.");
    			t10 = space();
    			p1 = element("p");
    			p1.textContent = "I'm a self-taught front-end developer capable of, and dedicated to, learning new skills through my work. I’ve worked on Alfred I. duPont-Columbia, Edward R. Murrow and Society of Professional Journalists award winning projects, and was part of the newspaper's 2017 Knight-Temple Table Stakes team to strategize a successful digital future.";
    			t12 = space();
    			p2 = element("p");
    			p2.textContent = "I studied journalism at Marquette University and completed a masters in digital content strategy and data interpretation from the University of Kansas.";
    			t14 = space();
    			p3 = element("p");
    			strong = element("strong");
    			strong.textContent = "Reach out →";
    			t16 = space();
    			a1 = element("a");
    			a1.textContent = "Email";
    			t18 = text(" | ");
    			a2 = element("a");
    			a2.textContent = "Twitter";
    			t20 = text(" | ");
    			a3 = element("a");
    			a3.textContent = "Github";
    			t22 = text(" | ");
    			a4 = element("a");
    			a4.textContent = "Linkedin";
    			t24 = space();
    			div2 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			a5 = element("a");
    			a5.textContent = "work";
    			t26 = space();
    			li1 = element("li");
    			a6 = element("a");
    			a6.textContent = "contact";
    			attr_dev(span, "class", "blinking svelte-k5tmoq");
    			add_location(span, file$4, 267, 21, 4718);
    			attr_dev(h1, "class", "svelte-k5tmoq");
    			add_location(h1, file$4, 267, 12, 4709);
    			attr_dev(h2, "class", "svelte-k5tmoq");
    			add_location(h2, file$4, 268, 12, 4775);
    			attr_dev(div0, "class", "name-title svelte-k5tmoq");
    			add_location(div0, file$4, 266, 8, 4672);
    			attr_dev(b, "class", "line svelte-k5tmoq");
    			add_location(b, file$4, 270, 8, 4847);
    			attr_dev(a0, "href", "https://www.jsonline.com");
    			attr_dev(a0, "class", "svelte-k5tmoq");
    			add_location(a0, file$4, 273, 51, 5040);
    			attr_dev(p0, "class", "svelte-k5tmoq");
    			add_location(p0, file$4, 273, 12, 5001);
    			attr_dev(p1, "class", "svelte-k5tmoq");
    			add_location(p1, file$4, 274, 12, 5367);
    			attr_dev(p2, "class", "svelte-k5tmoq");
    			add_location(p2, file$4, 275, 12, 5726);
    			add_location(strong, file$4, 276, 29, 5914);
    			attr_dev(a1, "class", "all-links svelte-k5tmoq");
    			attr_dev(a1, "href", "mailto:erinrcaughey@gmail.com");
    			add_location(a1, file$4, 276, 63, 5948);
    			attr_dev(a2, "class", "all-links svelte-k5tmoq");
    			attr_dev(a2, "href", "https://twitter.com/erin_caughey");
    			attr_dev(a2, "target", "_blank");
    			add_location(a2, file$4, 276, 133, 6018);
    			attr_dev(a3, "class", "all-links svelte-k5tmoq");
    			attr_dev(a3, "href", "https://github.com/erincaughey");
    			attr_dev(a3, "target", "_blank");
    			add_location(a3, file$4, 276, 224, 6109);
    			attr_dev(a4, "class", "all-links svelte-k5tmoq");
    			attr_dev(a4, "href", "https://www.linkedin.com/in/erin-caughey/");
    			attr_dev(a4, "target", "_blank");
    			add_location(a4, file$4, 276, 312, 6197);
    			attr_dev(p3, "class", "links svelte-k5tmoq");
    			add_location(p3, file$4, 276, 12, 5897);
    			attr_dev(div1, "class", "about-me svelte-k5tmoq");
    			add_location(div1, file$4, 271, 8, 4876);
    			attr_dev(a5, "class", "all-links svelte-k5tmoq");
    			attr_dev(a5, "href", "#work");
    			add_location(a5, file$4, 281, 20, 6400);
    			attr_dev(li0, "class", "svelte-k5tmoq");
    			add_location(li0, file$4, 280, 16, 6375);
    			attr_dev(a6, "class", "all-links svelte-k5tmoq");
    			attr_dev(a6, "href", "mailto:erinrcaughey@gmail.com");
    			add_location(a6, file$4, 284, 20, 6506);
    			attr_dev(li1, "class", "svelte-k5tmoq");
    			add_location(li1, file$4, 283, 16, 6481);
    			add_location(ul, file$4, 279, 12, 6354);
    			attr_dev(div2, "class", "work svelte-k5tmoq");
    			add_location(div2, file$4, 278, 8, 6323);
    			attr_dev(div3, "class", "header-wrapper svelte-k5tmoq");
    			add_location(div3, file$4, 264, 4, 4549);
    			attr_dev(header, "class", "svelte-k5tmoq");
    			add_location(header, file$4, 263, 0, 4536);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div3);
    			append_dev(div3, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(h1, span);
    			append_dev(h1, t2);
    			append_dev(div0, t3);
    			append_dev(div0, h2);
    			append_dev(div3, t5);
    			append_dev(div3, b);
    			append_dev(div3, t6);
    			append_dev(div3, div1);
    			append_dev(div1, p0);
    			append_dev(p0, t7);
    			append_dev(p0, a0);
    			append_dev(p0, t9);
    			append_dev(div1, t10);
    			append_dev(div1, p1);
    			append_dev(div1, t12);
    			append_dev(div1, p2);
    			append_dev(div1, t14);
    			append_dev(div1, p3);
    			append_dev(p3, strong);
    			append_dev(p3, t16);
    			append_dev(p3, a1);
    			append_dev(p3, t18);
    			append_dev(p3, a2);
    			append_dev(p3, t20);
    			append_dev(p3, a3);
    			append_dev(p3, t22);
    			append_dev(p3, a4);
    			append_dev(div3, t24);
    			append_dev(div3, div2);
    			append_dev(div2, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a5);
    			append_dev(ul, t26);
    			append_dev(ul, li1);
    			append_dev(li1, a6);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/ColumnOne.svelte generated by Svelte v3.42.2 */

    const file$3 = "src/ColumnOne.svelte";

    function create_fragment$3(ctx) {
    	let li;
    	let strong;
    	let t0;
    	let t1;
    	let t2;
    	let a;
    	let t3;

    	const block = {
    		c: function create() {
    			li = element("li");
    			strong = element("strong");
    			t0 = text(/*category*/ ctx[0]);
    			t1 = text(":");
    			t2 = space();
    			a = element("a");
    			t3 = text(/*text*/ ctx[1]);
    			add_location(strong, file$3, 21, 4, 203);
    			attr_dev(a, "href", /*url*/ ctx[2]);
    			attr_dev(a, "class", "svelte-13ec1jx");
    			add_location(a, file$3, 21, 33, 232);
    			attr_dev(li, "class", "svelte-13ec1jx");
    			add_location(li, file$3, 21, 0, 199);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, strong);
    			append_dev(strong, t0);
    			append_dev(strong, t1);
    			append_dev(li, t2);
    			append_dev(li, a);
    			append_dev(a, t3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*category*/ 1) set_data_dev(t0, /*category*/ ctx[0]);
    			if (dirty & /*text*/ 2) set_data_dev(t3, /*text*/ ctx[1]);

    			if (dirty & /*url*/ 4) {
    				attr_dev(a, "href", /*url*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ColumnOne', slots, []);
    	let { category } = $$props;
    	let { text } = $$props;
    	let { url } = $$props;
    	const writable_props = ['category', 'text', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ColumnOne> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('category' in $$props) $$invalidate(0, category = $$props.category);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('url' in $$props) $$invalidate(2, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({ category, text, url });

    	$$self.$inject_state = $$props => {
    		if ('category' in $$props) $$invalidate(0, category = $$props.category);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('url' in $$props) $$invalidate(2, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [category, text, url];
    }

    class ColumnOne extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { category: 0, text: 1, url: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ColumnOne",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*category*/ ctx[0] === undefined && !('category' in props)) {
    			console.warn("<ColumnOne> was created without expected prop 'category'");
    		}

    		if (/*text*/ ctx[1] === undefined && !('text' in props)) {
    			console.warn("<ColumnOne> was created without expected prop 'text'");
    		}

    		if (/*url*/ ctx[2] === undefined && !('url' in props)) {
    			console.warn("<ColumnOne> was created without expected prop 'url'");
    		}
    	}

    	get category() {
    		throw new Error("<ColumnOne>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set category(value) {
    		throw new Error("<ColumnOne>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<ColumnOne>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<ColumnOne>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<ColumnOne>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<ColumnOne>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/ColumnTwo.svelte generated by Svelte v3.42.2 */

    const file$2 = "src/ColumnTwo.svelte";

    // (61:8) {#if role !== ''}
    function create_if_block_1(ctx) {
    	let div;
    	let strong;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			strong = element("strong");
    			strong.textContent = "Role:";
    			t1 = space();
    			t2 = text(/*role*/ ctx[3]);
    			add_location(strong, file$2, 61, 30, 1307);
    			attr_dev(div, "class", "role svelte-vd6olj");
    			add_location(div, file$2, 61, 12, 1289);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, strong);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*role*/ 8) set_data_dev(t2, /*role*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(61:8) {#if role !== ''}",
    		ctx
    	});

    	return block;
    }

    // (64:8) {#if tools !== ''}
    function create_if_block(ctx) {
    	let div;
    	let strong;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			strong = element("strong");
    			strong.textContent = "Tools:";
    			t1 = space();
    			t2 = text(/*tools*/ ctx[4]);
    			add_location(strong, file$2, 64, 31, 1415);
    			attr_dev(div, "class", "tools svelte-vd6olj");
    			add_location(div, file$2, 64, 12, 1396);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, strong);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tools*/ 16) set_data_dev(t2, /*tools*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(64:8) {#if tools !== ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let a0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h4;
    	let a1;
    	let t1;
    	let t2;
    	let div0;
    	let strong;
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let if_block0 = /*role*/ ctx[3] !== '' && create_if_block_1(ctx);
    	let if_block1 = /*tools*/ ctx[4] !== '' && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h4 = element("h4");
    			a1 = element("a");
    			t1 = text(/*headline*/ ctx[1]);
    			t2 = space();
    			div0 = element("div");
    			strong = element("strong");
    			strong.textContent = "About:";
    			t4 = space();
    			t5 = text(/*text*/ ctx[2]);
    			t6 = space();
    			if (if_block0) if_block0.c();
    			t7 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(img, "class", "clip svelte-vd6olj");
    			if (!src_url_equal(img.src, img_src_value = /*images*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*text*/ ctx[2]);
    			add_location(img, file$2, 55, 8, 1029);
    			attr_dev(a0, "href", /*link*/ ctx[5]);
    			add_location(a0, file$2, 54, 4, 1003);
    			attr_dev(a1, "class", "all-links");
    			attr_dev(a1, "href", /*link*/ ctx[5]);
    			add_location(a1, file$2, 58, 12, 1126);
    			attr_dev(h4, "class", "svelte-vd6olj");
    			add_location(h4, file$2, 58, 8, 1122);
    			add_location(strong, file$2, 59, 33, 1214);
    			attr_dev(div0, "class", "description svelte-vd6olj");
    			add_location(div0, file$2, 59, 8, 1189);
    			attr_dev(div1, "class", "item-group svelte-vd6olj");
    			add_location(div1, file$2, 57, 4, 1089);
    			attr_dev(div2, "class", "col-two-item svelte-vd6olj");
    			add_location(div2, file$2, 53, 0, 972);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, a0);
    			append_dev(a0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h4);
    			append_dev(h4, a1);
    			append_dev(a1, t1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, strong);
    			append_dev(div0, t4);
    			append_dev(div0, t5);
    			append_dev(div1, t6);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t7);
    			if (if_block1) if_block1.m(div1, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*images*/ 1 && !src_url_equal(img.src, img_src_value = /*images*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*text*/ 4) {
    				attr_dev(img, "alt", /*text*/ ctx[2]);
    			}

    			if (dirty & /*link*/ 32) {
    				attr_dev(a0, "href", /*link*/ ctx[5]);
    			}

    			if (dirty & /*headline*/ 2) set_data_dev(t1, /*headline*/ ctx[1]);

    			if (dirty & /*link*/ 32) {
    				attr_dev(a1, "href", /*link*/ ctx[5]);
    			}

    			if (dirty & /*text*/ 4) set_data_dev(t5, /*text*/ ctx[2]);

    			if (/*role*/ ctx[3] !== '') {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(div1, t7);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*tools*/ ctx[4] !== '') {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ColumnTwo', slots, []);
    	let { images } = $$props;
    	let { headline } = $$props;
    	let { text } = $$props;
    	let { role } = $$props;
    	let { tools } = $$props;
    	let { link } = $$props;
    	const writable_props = ['images', 'headline', 'text', 'role', 'tools', 'link'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ColumnTwo> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('images' in $$props) $$invalidate(0, images = $$props.images);
    		if ('headline' in $$props) $$invalidate(1, headline = $$props.headline);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    		if ('role' in $$props) $$invalidate(3, role = $$props.role);
    		if ('tools' in $$props) $$invalidate(4, tools = $$props.tools);
    		if ('link' in $$props) $$invalidate(5, link = $$props.link);
    	};

    	$$self.$capture_state = () => ({
    		images,
    		headline,
    		text,
    		role,
    		tools,
    		link
    	});

    	$$self.$inject_state = $$props => {
    		if ('images' in $$props) $$invalidate(0, images = $$props.images);
    		if ('headline' in $$props) $$invalidate(1, headline = $$props.headline);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    		if ('role' in $$props) $$invalidate(3, role = $$props.role);
    		if ('tools' in $$props) $$invalidate(4, tools = $$props.tools);
    		if ('link' in $$props) $$invalidate(5, link = $$props.link);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [images, headline, text, role, tools, link];
    }

    class ColumnTwo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			images: 0,
    			headline: 1,
    			text: 2,
    			role: 3,
    			tools: 4,
    			link: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ColumnTwo",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*images*/ ctx[0] === undefined && !('images' in props)) {
    			console.warn("<ColumnTwo> was created without expected prop 'images'");
    		}

    		if (/*headline*/ ctx[1] === undefined && !('headline' in props)) {
    			console.warn("<ColumnTwo> was created without expected prop 'headline'");
    		}

    		if (/*text*/ ctx[2] === undefined && !('text' in props)) {
    			console.warn("<ColumnTwo> was created without expected prop 'text'");
    		}

    		if (/*role*/ ctx[3] === undefined && !('role' in props)) {
    			console.warn("<ColumnTwo> was created without expected prop 'role'");
    		}

    		if (/*tools*/ ctx[4] === undefined && !('tools' in props)) {
    			console.warn("<ColumnTwo> was created without expected prop 'tools'");
    		}

    		if (/*link*/ ctx[5] === undefined && !('link' in props)) {
    			console.warn("<ColumnTwo> was created without expected prop 'link'");
    		}
    	}

    	get images() {
    		throw new Error("<ColumnTwo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set images(value) {
    		throw new Error("<ColumnTwo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get headline() {
    		throw new Error("<ColumnTwo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set headline(value) {
    		throw new Error("<ColumnTwo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<ColumnTwo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<ColumnTwo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get role() {
    		throw new Error("<ColumnTwo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set role(value) {
    		throw new Error("<ColumnTwo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tools() {
    		throw new Error("<ColumnTwo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tools(value) {
    		throw new Error("<ColumnTwo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<ColumnTwo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<ColumnTwo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Contact.svelte generated by Svelte v3.42.2 */

    const file$1 = "src/Contact.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let a0;
    	let t1;
    	let br0;
    	let t2;
    	let a1;
    	let i0;
    	let t3;
    	let t4;
    	let br1;
    	let t5;
    	let a2;
    	let i1;
    	let t6;
    	let t7;
    	let br2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "erinrcaughey@gmail.com";
    			t1 = space();
    			br0 = element("br");
    			t2 = space();
    			a1 = element("a");
    			i0 = element("i");
    			t3 = text(" erin_caughey");
    			t4 = space();
    			br1 = element("br");
    			t5 = space();
    			a2 = element("a");
    			i1 = element("i");
    			t6 = text(" erincaughey");
    			t7 = space();
    			br2 = element("br");
    			attr_dev(a0, "class", "all-links svelte-10vltyn");
    			attr_dev(a0, "href", "mailto:erinrcaughey@gmail.com");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$1, 40, 8, 715);
    			add_location(br0, file$1, 40, 109, 816);
    			attr_dev(i0, "class", "fab fa-twitter");
    			add_location(i0, file$1, 41, 85, 906);
    			attr_dev(a1, "class", "all-links svelte-10vltyn");
    			attr_dev(a1, "href", "https://twitter.com/erin_caughey");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$1, 41, 8, 829);
    			add_location(br1, file$1, 41, 133, 954);
    			attr_dev(i1, "class", "fab fa-github");
    			add_location(i1, file$1, 42, 83, 1042);
    			attr_dev(a2, "class", "all-links svelte-10vltyn");
    			attr_dev(a2, "href", "https://github.com/erincaughey");
    			attr_dev(a2, "target", "_blank");
    			add_location(a2, file$1, 42, 8, 967);
    			add_location(br2, file$1, 42, 129, 1088);
    			attr_dev(div0, "class", "link svelte-10vltyn");
    			add_location(div0, file$1, 38, 4, 631);
    			attr_dev(div1, "class", "footer-wrapper svelte-10vltyn");
    			add_location(div1, file$1, 37, 0, 598);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(div0, t1);
    			append_dev(div0, br0);
    			append_dev(div0, t2);
    			append_dev(div0, a1);
    			append_dev(a1, i0);
    			append_dev(a1, t3);
    			append_dev(div0, t4);
    			append_dev(div0, br1);
    			append_dev(div0, t5);
    			append_dev(div0, a2);
    			append_dev(a2, i1);
    			append_dev(a2, t6);
    			append_dev(div0, t7);
    			append_dev(div0, br2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.42.2 */
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (74:6) {#each contributionItems as contributionItem, i}
    function create_each_block_1(ctx) {
    	let columnone;
    	let current;

    	columnone = new ColumnOne({
    			props: {
    				category: /*contributionItem*/ ctx[5].category,
    				url: /*contributionItem*/ ctx[5].url,
    				text: /*contributionItem*/ ctx[5].text
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(columnone.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(columnone, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const columnone_changes = {};
    			if (dirty & /*contributionItems*/ 2) columnone_changes.category = /*contributionItem*/ ctx[5].category;
    			if (dirty & /*contributionItems*/ 2) columnone_changes.url = /*contributionItem*/ ctx[5].url;
    			if (dirty & /*contributionItems*/ 2) columnone_changes.text = /*contributionItem*/ ctx[5].text;
    			columnone.$set(columnone_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(columnone.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(columnone.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(columnone, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(74:6) {#each contributionItems as contributionItem, i}",
    		ctx
    	});

    	return block;
    }

    // (82:3) {#each workItems as workItem, i}
    function create_each_block(ctx) {
    	let columntwo;
    	let current;

    	columntwo = new ColumnTwo({
    			props: {
    				images: /*workItem*/ ctx[2].images,
    				headline: /*workItem*/ ctx[2].headline,
    				text: /*workItem*/ ctx[2].text,
    				role: /*workItem*/ ctx[2].role,
    				tools: /*workItem*/ ctx[2].tools,
    				awards: /*workItem*/ ctx[2].awards,
    				link: /*workItem*/ ctx[2].link
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(columntwo.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(columntwo, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const columntwo_changes = {};
    			if (dirty & /*workItems*/ 1) columntwo_changes.images = /*workItem*/ ctx[2].images;
    			if (dirty & /*workItems*/ 1) columntwo_changes.headline = /*workItem*/ ctx[2].headline;
    			if (dirty & /*workItems*/ 1) columntwo_changes.text = /*workItem*/ ctx[2].text;
    			if (dirty & /*workItems*/ 1) columntwo_changes.role = /*workItem*/ ctx[2].role;
    			if (dirty & /*workItems*/ 1) columntwo_changes.tools = /*workItem*/ ctx[2].tools;
    			if (dirty & /*workItems*/ 1) columntwo_changes.awards = /*workItem*/ ctx[2].awards;
    			if (dirty & /*workItems*/ 1) columntwo_changes.link = /*workItem*/ ctx[2].link;
    			columntwo.$set(columntwo_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(columntwo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(columntwo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(columntwo, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(82:3) {#each workItems as workItem, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div5;
    	let about;
    	let t0;
    	let h2;
    	let t2;
    	let div4;
    	let div2;
    	let div1;
    	let div0;
    	let h4;
    	let t4;
    	let ul;
    	let t5;
    	let div3;
    	let t6;
    	let contact;
    	let current;
    	about = new About({ $$inline: true });
    	let each_value_1 = /*contributionItems*/ ctx[1];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*workItems*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	contact = new Contact({ $$inline: true });

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			create_component(about.$$.fragment);
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "WORK";
    			t2 = space();
    			div4 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h4 = element("h4");
    			h4.textContent = "[Reporting Contributions]";
    			t4 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t5 = space();
    			div3 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			create_component(contact.$$.fragment);
    			attr_dev(h2, "id", "work");
    			attr_dev(h2, "class", "svelte-tlgx5s");
    			add_location(h2, file, 66, 1, 1136);
    			attr_dev(h4, "class", "svelte-tlgx5s");
    			add_location(h4, file, 71, 5, 1274);
    			add_location(ul, file, 72, 5, 1314);
    			attr_dev(div0, "class", "item-group svelte-tlgx5s");
    			add_location(div0, file, 70, 4, 1244);
    			attr_dev(div1, "class", "col-one-item svelte-tlgx5s");
    			add_location(div1, file, 69, 3, 1213);
    			attr_dev(div2, "class", "col-one");
    			add_location(div2, file, 68, 2, 1188);
    			attr_dev(div3, "class", "col-two");
    			add_location(div3, file, 80, 2, 1555);
    			attr_dev(div4, "class", "work-items svelte-tlgx5s");
    			add_location(div4, file, 67, 1, 1161);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file, 63, 0, 1100);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			mount_component(about, div5, null);
    			append_dev(div5, t0);
    			append_dev(div5, h2);
    			append_dev(div5, t2);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h4);
    			append_dev(div0, t4);
    			append_dev(div0, ul);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(ul, null);
    			}

    			append_dev(div4, t5);
    			append_dev(div4, div3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			append_dev(div5, t6);
    			mount_component(contact, div5, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*contributionItems*/ 2) {
    				each_value_1 = /*contributionItems*/ ctx[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*workItems*/ 1) {
    				each_value = /*workItems*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div3, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(about.$$.fragment, local);

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(about.$$.fragment, local);
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_component(about);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(contact);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let workItems = [];
    	let contributionItems = [];

    	onMount(async () => {
    		const work = await fetch(`data/work.json`);
    		$$invalidate(0, workItems = await work.json());
    		const cont = await fetch(`data/contributions.json`);
    		$$invalidate(1, contributionItems = await cont.json());
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		About,
    		ColumnOne,
    		ColumnTwo,
    		Contact,
    		workItems,
    		contributionItems
    	});

    	$$self.$inject_state = $$props => {
    		if ('workItems' in $$props) $$invalidate(0, workItems = $$props.workItems);
    		if ('contributionItems' in $$props) $$invalidate(1, contributionItems = $$props.contributionItems);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [workItems, contributionItems];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.querySelector('#content')
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
